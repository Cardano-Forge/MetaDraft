"use client";

import React, { useEffect, useState } from "react";
import { useRxData } from "rxdb-hooks";
import { useSearchParams } from "next/navigation";

import { type Rule } from "~/lib/rules";
import { type RulesCollection } from "~/lib/types";

import TableSkeleton from "./table/table-skeleton";
import TableRules from "./table";
import GridRules from "./grid";
import { getViewFromParams } from "~/lib/get/get-view-from-param";
import GridSkeleton from "./grid/grid-skeleton";

export default function Content() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const view = getViewFromParams(searchParams.get("view"));

  const [keys, setKeys] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { result, isFetching } = useRxData<RulesCollection>(
    "rules",
    (collection) => collection.find(),
  );

  const fetchKeys = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/keys");
      const data = (await response.json()) as { keys: Rule[] };
      setKeys(data.keys);
    } catch (error) {
      console.error("Failed to fetch keys:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    void fetchKeys();
  }, []);

  if (loading || isFetching)
    return view === "table" ? <TableSkeleton /> : <GridSkeleton />;

  const rules: RulesCollection | undefined = result[0]
    ? (result[0].toJSON() as RulesCollection)
    : undefined;

  if (!rules) return null;

  const searchedKeys = keys.filter((key) =>
    key.toLocaleLowerCase().includes((searchTerm ?? "").toLocaleLowerCase()),
  );

  if (view === "table") return <TableRules keys={searchedKeys} rules={rules} />;

  return <GridRules keys={searchedKeys} rules={rules} />;
}

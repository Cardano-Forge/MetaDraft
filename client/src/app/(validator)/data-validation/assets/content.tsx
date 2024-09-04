import React from "react";
import { useSearchParams } from "next/navigation";

import { type Metadata } from "~/lib/db/types";

import TableView from "./table";
import GridView from "./grid";
import { bind } from "~/lib/bind-number";

type ContentProps = {
  metadata: Metadata["data"][];
};

export default function Content({ metadata }: ContentProps) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const view = searchParams.get("view") ?? "table"; // Default to : table
  const page = getPageFromParams(currentPage, metadata.length);

  return <div>false</div>;

  if (view === "table") return <TableView metadata={metadata} page={page} />;

  return <GridView metadata={metadata} page={page} />;
}

const getPageFromParams = (param: string | null, max: number) => {
  if (!param) return 1;
  if (isNaN(+param)) return 1;
  return bind(1, max, +param);
};

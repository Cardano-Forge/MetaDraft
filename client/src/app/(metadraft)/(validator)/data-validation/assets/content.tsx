import React from "react";
import { useSearchParams } from "next/navigation";

import type { MetadataCollection } from "~/lib/types";

import TableView from "./table";
import GridView from "./grid";
import { getViewFromParams } from "~/lib/get/get-view-from-param";

export default function Content({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const searchParams = useSearchParams();
  const view = getViewFromParams(searchParams.get("view"));

  if (view === "table") return <TableView metadatas={metadatas} />;

  return <GridView metadatas={metadatas} />;
}

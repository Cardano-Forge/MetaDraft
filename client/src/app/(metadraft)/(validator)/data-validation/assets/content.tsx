import { useSearchParams } from "next/navigation";
import React from "react";


import GridView from "./grid";
import TableView from "./table";
import { getViewFromParams } from "~/lib/get/get-view-from-param";
import type { MetadataCollection } from "~/lib/types";

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

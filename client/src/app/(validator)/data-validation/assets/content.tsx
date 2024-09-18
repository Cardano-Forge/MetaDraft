import React from "react";
import { useSearchParams } from "next/navigation";

import type { MetadataCollection } from "~/lib/types";

import TableView from "./table";
import GridView from "./grid";

export default function Content({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "table"; // Default to : table

  if (view === "table") return <TableView metadatas={metadatas} />;

  return <GridView metadatas={metadatas} />;
}

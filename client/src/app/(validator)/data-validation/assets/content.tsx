import React from "react";
import { useSearchParams } from "next/navigation";

import type { MetatdataJSON } from "~/lib/types";

import TableView from "./table";
import GridView from "./grid";
import { getPageFromParams } from "~/lib/get-page-from-param";

export default function Content({ metadata }: { metadata: MetatdataJSON[] }) {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "table"; // Default to : table
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadata.length);

  if (view === "table") return <TableView metadata={metadata} page={page} />;

  return <GridView metadata={metadata} page={page} />;
}

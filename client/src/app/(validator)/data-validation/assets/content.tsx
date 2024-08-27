import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { type Metadata } from "~/lib/db/types";
import useLocalStorage from "~/lib/hooks/use-local-storage";

import TableView from "./table";
import GridView from "./grid";

type ContentProps = {
  metadata: Metadata["data"][];
};

export default function Content({ metadata }: ContentProps) {
  const searchParams = useSearchParams();
  const param = searchParams.get("page");
  const view = searchParams.get("view");
  const [page, setPage] = useState<number>(param ? +param : 1);
  const [assetView] = useLocalStorage("asset_view", view ?? "table"); // maybe set it in url

  if (assetView === "table")
    return <TableView metadata={metadata} page={page} setPage={setPage} />;

  return <GridView metadata={metadata} page={page} setPage={setPage} />;
}

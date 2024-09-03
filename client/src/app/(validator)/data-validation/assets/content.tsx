import React, { useState } from "react";
import { useSearchParams } from "next/navigation";

import { type Metadata } from "~/lib/db/types";

import TableView from "./table";
import GridView from "./grid";

type ContentProps = {
  metadata: Metadata["data"][];
};

export default function Content({ metadata }: ContentProps) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const view = searchParams.get("view") ?? "table"; // Default to : table
  const [page, setPage] = useState<number>(getPageFromParams(currentPage));

  if (page === 0)
    return (
      <div className="mx-auto mb-8 mt-4 flex w-fit items-center justify-center rounded-xl border border-warning p-4 text-warning">
        Invalid input: &ldquo;page&ldquo; parameter in the URL must be a number.
      </div>
    );

  if (view === "table")
    return <TableView metadata={metadata} page={page} setPage={setPage} />;

  return <GridView metadata={metadata} page={page} setPage={setPage} />;
}

const getPageFromParams = (param: string | null) => {
  if (!param) return 1;
  if (isNaN(+param)) return 0;
  return +param;
};

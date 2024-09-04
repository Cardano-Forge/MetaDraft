import React from "react";
import { useSearchParams } from "next/navigation";

import { type Metadata } from "~/lib/db/types";

import TableView from "./table";
import GridView from "./grid";
import { bind } from "~/lib/bind-number";
import { useActiveProject } from "~/providers/active-project.provider";
import { useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import { chunk } from "~/lib/chunk";

export default function Content() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view") ?? "table"; // Default to : table
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<Metadata>("metadata", (collection) =>
    collection.findByIds([activeProject?.metadataId ?? ""]),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata = result[0]?.data;

  if (!activeProject || !metadata) return <div>No data found.</div>;

  const pagedMetadata = chunk(metadata, 10);
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, pagedMetadata.length);

  if (view === "table")
    return <TableView metadata={pagedMetadata} page={page} />;

  return <GridView metadata={pagedMetadata} page={page} />;
}

const getPageFromParams = (param: string | null, max: number) => {
  if (!param) return 1;
  if (isNaN(+param)) return 1;
  return bind(1, max, +param);
};

"use client";

import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { useActiveProject } from "~/providers/active-project.provider";
import type { MetadataValidations, Metadata } from "~/lib/db/types";
import { chunk } from "~/lib/chunk";

import Header from "./header";
import Content from "./content";

export default function Assets() {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<Metadata>("metadata", (collection) =>
    collection.findByIds([activeProject?.metadataId ?? ""]),
  );

  const { result: validatorResults, isFetching: isFetchingResults } =
    useRxData<MetadataValidations>("validations", (collection) =>
      collection.findByIds(["validations"]),
    );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata = result[0]?.data;
  const validations = validatorResults[0]?._data.validations;

  if (!activeProject || !metadata || !validations)
    return <div>No data found.</div>;

  const chunked = chunk(metadata, 10);

  return (
    <div className="flex flex-col rounded-2xl bg-card">
      <Header metadata={chunked} />
      <Content metadata={chunked} validations={validations} />
    </div>
  );
}

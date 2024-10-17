"use client";

import { type Dispatch, type SetStateAction } from "react";
import { useSearchParams } from "next/navigation";
import { useRxData } from "rxdb-hooks";

import type { MetadataCollection } from "~/lib/types";
import { chunk } from "~/lib/chunk";
import { filter } from "~/lib/filter";
import { getSortBy } from "~/lib/get-sort-by-from-param";
import { sort } from "~/lib/sort";

import { useActiveProject } from "~/providers/active-project.provider";

import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import LoaderComponent from "~/components/loader-component";

export default function Assets({
  handleLoading,
}: {
  handleLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const sortBy = searchParams.get("sort");
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find(),
  );

  if (isFetching) return <LoaderComponent />;

  const metadata: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  if (!activeProject || !metadata) return <div>No data found.</div>;

  const searchedMetadata = filter(metadata, searchTerm);
  const sortedMetadata = sort(searchedMetadata, getSortBy(sortBy));
  const pagedMetadata = chunk(sortedMetadata, 10);

  return (
    <div className="flex flex-col rounded-2xl bg-card">
      <Header handleLoading={handleLoading} />
      <Content metadatas={pagedMetadata} />
      <Footer lastPage={pagedMetadata.length} />
    </div>
  );
}

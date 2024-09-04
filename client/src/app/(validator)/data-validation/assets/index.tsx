"use client";

import { useActiveProject } from "~/providers/active-project.provider";

import Header from "./header";
import Content from "./content";
import Footer from "./footer";
import { useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import type { Metadata } from "~/lib/db/types";
import { chunk } from "~/lib/chunk";

export default function Assets() {
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

  return (
    <div className="flex flex-col rounded-2xl bg-card">
      <Header />
      <Content metadata={pagedMetadata} />
      <Footer lastPage={pagedMetadata.length} />
    </div>
  );
}

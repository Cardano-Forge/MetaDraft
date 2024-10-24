"use client";

import React from "react";
import { useRxData } from "rxdb-hooks";
import type { MetadataCollection } from "~/lib/types";
import JSONEditor from "./content/json-editor";
import Errors from "./content/errors";
import LoaderComponent from "~/components/loader-component";
import Header from "./header";
import PageAssetSkeleton from "./page-asset-skeleton";
import { notFound } from "next/navigation";

export default function SingleAssetPage({
  params,
}: {
  params: { id: string };
}) {
  const [isValidating, setValidating] = React.useState<boolean>(false);
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.findByIds([params.id]),
  );

  if (isFetching) return <LoaderComponent />;

  const metadata: MetadataCollection | undefined = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  )[0];

  if (!metadata) notFound();

  if (isValidating)
    return (
      <PageAssetSkeleton metadata={metadata} isValidating={isValidating} />
    );

  return (
    <div className="pt-5">
      <div className="container">
        <Header metadata={metadata} />
      </div>
      <main className="border-t border-white/15 py-8">
        <div className="container">
          <div className="flex flex-row gap-4">
            <Errors metadata={metadata} />
            <JSONEditor metadata={metadata} handleValidation={setValidating} />
          </div>
        </div>
      </main>
    </div>
  );
}

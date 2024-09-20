"use client";

import React from "react";
import { useRxData } from "rxdb-hooks";
import type { MetadataCollection } from "~/lib/types";
import JSONEditor from "./content/json-editor";

export default function SingleAssetPage({
  params,
}: {
  params: { id: string };
}) {
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.findByIds([params.id]),
  );

  if (isFetching) {
  }

  const metadata: MetadataCollection | undefined = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  )[0];

  if (!metadata) return <div>No metdata found</div>;

  return (
    <div className="flex flex-col gap-4">
      <JSONEditor metadata={metadata} />
    </div>
  );
}

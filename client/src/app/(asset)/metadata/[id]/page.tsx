"use client";

import React from "react";
import { useRxData } from "rxdb-hooks";
import type { MetadataCollection } from "~/lib/types";
import JSONEditor from "./content/json-editor";
import Errors from "./content/errors";
import LoaderComponent from "~/components/loader-component";

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

  if (isFetching || isValidating) return <LoaderComponent />;

  const metadata: MetadataCollection | undefined = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  )[0];

  if (!metadata) return <div>No metdata found</div>;

  return (
    <div className="flex flex-row gap-4">
      <Errors metadata={metadata} />
      <JSONEditor metadata={metadata} handleValidation={setValidating} />
    </div>
  );
}

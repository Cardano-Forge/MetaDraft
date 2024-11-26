"use client";

import { notFound } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useRxData } from "rxdb-hooks";

import Errors from "./content/errors";
import JSONEditor from "./content/json-editor";
import Header from "./header";
import PageAssetSkeleton from "./page-asset-skeleton";
import LoaderComponent from "~/components/loader-component";
import type { MetadataCollection } from "~/lib/types";

export default function SingleAssetPage({
  params,
}: {
  params: { id: string };
}) {
  const [isValidating, setValidating] = useState<boolean>(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.findByIds([params.id]),
  );

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        (event || window.event).returnValue =
          "Changes you made may not be saved.";
        return "Changes you made may not be saved."; // Gecko + Webkit, Safari, Chrome etc.
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

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
        <Header
          metadata={metadata}
          hasUnsavedChanges={hasUnsavedChanges}
          setHasUnsavedChanges={setHasUnsavedChanges}
        />
      </div>
      <main className="border-t border-white/15 py-8">
        <div className="container">
          <div className="flex flex-row gap-4">
            <Errors metadata={metadata} />
            <JSONEditor
              metadata={metadata}
              handleValidation={setValidating}
              hasUnsavedChanges={hasUnsavedChanges}
              setHasUnsavedChanges={setHasUnsavedChanges}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

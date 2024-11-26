"use client";

import { notFound, useRouter } from "next/navigation";
import { useRxData } from "rxdb-hooks";

import JSONCreator from "./json-creator";
import LoaderComponent from "~/components/loader-component";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import type { MetadataCollection, MetadataSchemaCollection } from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";
import { useEffect, useState } from "react";

export default function StructurePage() {
  const router = useRouter();
  const activeProject = useActiveProject();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        event.preventDefault();
        (event || window.event).returnValue = "Changes you made may not be saved.";
        return "Changes you made may not be saved."; // Gecko + Webkit, Safari, Chrome etc.
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [hasUnsavedChanges]);

  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find(),
  );

  const { result: schemaResult, isFetching: isFetchingSchema } =
    useRxData<MetadataSchemaCollection>("metadataSchema", (collection) =>
      collection.find(),
    );

  if (isFetching || isFetchingSchema) return <LoaderComponent />;

  const metadatas: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  const schema: MetadataSchemaCollection | undefined =
    schemaResult[0]?.toJSON() as MetadataSchemaCollection;

  if (!activeProject) return null; // Cannot return notFound when clearing project

  if (!metadatas) return notFound();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (hasUnsavedChanges) {
      e.preventDefault(); // Stop the default navigation behavior
      const confirmLeave = confirm(
        "A - You have unsaved changes. Are you sure you want to leave this page?",
      );
      if (confirmLeave) {
        setHasUnsavedChanges(false); // Reset unsaved changes
        router.push("/rules-selection"); // Navigate manually
      }
    }
  };



  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Metadata Structure</Typography>
          <Typography as="p" className="text-sm text-white/50">
            This section will help you craft the structure of your metadata.
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Button asChild>
            <a
              title="Go to rules selection"
              href={"/rules-selection"}
              onClick={handleClick}
            >
              Next step
              <span className="sr-only">
                Complete this step and navigaton to next one: rules selection
              </span>
            </a>
          </Button>
        </div>
      </div>
      <JSONCreator
        structure={schema.schema}
        metadatas={metadatas}
        hasUnsavedChanges={hasUnsavedChanges}
        setHasUnsavedChanges={setHasUnsavedChanges}
      />
    </div>
  );
}

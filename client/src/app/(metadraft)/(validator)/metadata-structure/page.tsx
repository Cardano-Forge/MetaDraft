"use client";

import { useRxData } from "rxdb-hooks";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "~/components/ui/button";
import { Typography } from "~/components/typography";
import LoaderComponent from "~/components/loader-component";
import { getMetadataSchema } from "~/lib/get/get-metadata-schema";
import type {
  MetadataCollection,
  MetadataCollectionEditor,
  MetadataSchemaCollection,
} from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";

import JSONCreator from "./json-creator";

export default function StructurePage() {
  const activeProject = useActiveProject();
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

  const metadataSchema = getMetadataSchema(metadatas);

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
            <Link title="Go to rules selection" href={"/rules-selection"}>
              Validate this step
              <span className="sr-only">
                Complete this step and navigaton to next one: rules selection
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <JSONCreator
        structure={
          schema?.schema ?? (metadataSchema as MetadataCollectionEditor)
        }
        metadatas={metadatas}
      />
    </div>
  );
}

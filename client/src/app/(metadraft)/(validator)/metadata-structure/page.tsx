"use client";

import { useRxData } from "rxdb-hooks";

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
import { notFound } from "next/navigation";

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

  if (!activeProject) return null;

  if (!metadatas) return notFound();

  const metadataSchema = getMetadataSchema(metadatas);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Metadata Structure</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4"></div>
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

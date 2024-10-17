import React from "react";
import { Button } from "./ui/button";
import PlusIcon from "~/icons/plus.icon";
import { useRxCollection, useRxData } from "rxdb-hooks";
import type {
  MetadataCollection,
  MetadataSchemaCollection,
  ProjectCollection,
} from "~/lib/types";
import LoaderComponent from "./loader-component";
import { DEFAULT_CIP25_SCHEMA } from "~/lib/constant";
import { useActiveProject } from "~/providers/active-project.provider";

export default function AddAssetButton() {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");

  const { result: schemaResult, isFetching: isFetchingSchema } =
    useRxData<MetadataSchemaCollection>("metadataSchema", (collection) =>
      collection.find(),
    );

  if (isFetchingSchema) return <LoaderComponent />;

  const schema: MetadataSchemaCollection | undefined = schemaResult.map(
    (doc) => doc.toJSON() as MetadataSchemaCollection,
  )[0];

  if (!activeProject) return null;

  const project = activeProject.toJSON() as ProjectCollection;

  const handleAdd = async () => {
    await metadataCollection?.insert({
      id: self.crypto.randomUUID(),
      ...(schema?.schema ?? DEFAULT_CIP25_SCHEMA),
      status: "unchecked",
    });

    await projectCollection?.upsert({
      ...project,
      nfts: project.nfts + 1,
      unchecked: project.unchecked + 1,
    });
  };

  return (
    <Button
      variant={"ghost"}
      className="flex h-[50px] flex-row gap-2 rounded-full !px-4"
      onClick={handleAdd}
    >
      <PlusIcon /> Add
    </Button>
  );
}

import { useRouter } from "next/navigation";
import React from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";

import Loader from "./loader";
import LoaderComponent from "./loader-component";
import { Button } from "./ui/button";
import PlusIcon from "~/icons/plus.icon";
import { DEFAULT_CIP25_SCHEMA } from "~/lib/constant";
import type {
  MetadataCollection,
  MetadataSchemaCollection,
  ProjectCollection,
} from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";

export default function AddAssetButton() {
  const router = useRouter();
  const activeProject = useActiveProject();
  const [isLoading, setLoading] = React.useState<boolean>(false);
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
    if (isLoading) return;
    try {
      setLoading(true);
      const id = self.crypto.randomUUID();

      await projectCollection?.upsert({
        ...project,
        nfts: project.nfts + 1,
        unchecked: project.unchecked + 1,
      });

      await metadataCollection?.insert({
        id,
        assetName: `${project.nfts + 1}`,
        metadata: {
          ...(schema?.schema.metadata ?? DEFAULT_CIP25_SCHEMA.metadata),
          name: (
            schema?.schema.metadata.name ?? DEFAULT_CIP25_SCHEMA.metadata.name
          ).endsWith("#")
            ? `${schema?.schema.metadata.name ?? DEFAULT_CIP25_SCHEMA.metadata.name}${project.nfts + 1}`
            : `${project.nfts + 1}`,
        },
        status: "unchecked",
      });
      router.push(`/metadata/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Button
      disabled={isLoading}
      className="flex h-[50px] flex-row gap-2 rounded-full !px-4"
      onClick={handleAdd}
    >
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PlusIcon /> Add
        </>
      )}
      <span className="sr-only">
        Add a new asset to the metadata list with default values.
      </span>
    </Button>
  );
}

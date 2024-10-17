import React, { Dispatch, SetStateAction } from "react";
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
import { useRouter } from "next/navigation";

export default function AddAssetButton({
  handleLoading,
}: {
  handleLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
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
    try {
      handleLoading(true);
      const id = self.crypto.randomUUID();

      await metadataCollection?.insert({
        id,
        assetName: `${project.nfts + 1}`,
        metadata: {
          ...(schema?.schema.metadata ?? DEFAULT_CIP25_SCHEMA.metadata),
          name: `${project.nfts + 1}`,
        },
        status: "unchecked",
      });

      await projectCollection?.upsert({
        ...project,
        nfts: project.nfts + 1,
        unchecked: project.unchecked + 1,
      });

      router.push(`/metadata/${id}`);
    } catch (error) {
      console.error(error);
    }
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

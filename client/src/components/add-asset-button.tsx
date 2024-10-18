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
import { useRouter } from "next/navigation";
import Loader from "./loader";

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
          name: `${project.nfts + 1}`,
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
      title="Add new asset"
      disabled={isLoading}
      variant={"outline"}
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
    </Button>
  );
}

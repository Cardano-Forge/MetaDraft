import React, { type Dispatch, type SetStateAction } from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import { Button } from "~/components/ui/button";
import type {
  MetadataCollection,
  ProjectCollection,
  ValidationsCollection,
} from "~/lib/types";
import { getStatsFromValidations } from "~/lib/get/get-stats";
import { getStatus } from "~/lib/get/get-status";
import { useActiveProject } from "~/providers/active-project.provider";
import { validateMetadata } from "~/server/validations";

export default function Validator({
  handleValidating,
}: {
  handleValidating: Dispatch<SetStateAction<boolean>>;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const validationsCollection =
    useRxCollection<ValidationsCollection>("validations");
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.findByIds([activeProject?.metadataId ?? ""]),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );
  const project = activeProject?._data;

  if (!metadata || !project) return null;

  const handleValidation = async () => {
    try {
      handleValidating(true);
      // Validate the metadata
      const validations = await validateMetadata(metadata);

      console.log("validations", validations);

      // Add validations in RXDB
      // await validationsCollection?.upsert({
      //   id: "validations",
      //   validations,
      // });

      // Get project information
      const stats = getStatsFromValidations(validations, metadata.length);

      // Add project information in RXDB
      await projectCollection?.upsert({
        ...project,
        ...stats,
      });

      // Get asset status.
      const status = getStatus(metadata, validations);
      console.log("status", status);
      // Update status in RXDB
    } catch (error) {
    } finally {
      handleValidating(false);
    }
  };

  return (
    <Button variant={"successOutline"} onClick={handleValidation}>
      Validate Data
    </Button>
  );
}

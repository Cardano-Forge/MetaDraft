import React, { Dispatch, SetStateAction } from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import { Button } from "~/components/ui/button";
import type {
  Metadata,
  MetadataStatus,
  MetadataValidations,
  Project,
} from "~/lib/db/types";
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
  const projectCollection = useRxCollection<Project>("project");
  const validationsCollection =
    useRxCollection<MetadataValidations>("validations");
  const statusCollection = useRxCollection<MetadataStatus>("status");

  const { result, isFetching } = useRxData<Metadata>("metadata", (collection) =>
    collection.findByIds([activeProject?.metadataId ?? ""]),
  );
  const { result: projectResult, isFetching: isFetchingProject } =
    useRxData<Project>("project", (collection) =>
      collection.findByIds(["project"]),
    );

  if (isFetching || isFetchingProject)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata = result[0]?.data;
  const project = projectResult[0]?._data;

  if (!metadata || !project) return null;

  const handleValidation = async () => {
    try {
      handleValidating(true);
      // Validate the metadata
      const validations = await validateMetadata(metadata);
      // Add validations in RXDB
      await validationsCollection?.upsert({
        id: "validations",
        validations,
      });

      // Get project information
      const stats = getStatsFromValidations(validations, metadata.length);
      const newProject: Project = {
        ...project,
        ...stats,
      };

      // Add project information in RXDB
      await projectCollection?.upsert(newProject);

      // Get asset status.
      const status = getStatus(metadata, validations);
      // Add status in RXDB
      await statusCollection?.upsert({
        id: "assetStatus",
        status,
      });
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

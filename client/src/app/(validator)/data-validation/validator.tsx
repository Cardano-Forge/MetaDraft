import React, { type Dispatch, type SetStateAction } from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import type {
  MetadataCollection,
  ProjectCollection,
  RulesCollection,
  ValidationsCollection,
} from "~/lib/types";
import { getStats } from "~/lib/get/get-stats";
import { useActiveProject } from "~/providers/active-project.provider";
import { validateMetadata } from "~/server/validations";
import { setMetadataStatusFromValidations } from "~/lib/set-metadata-status-from-validation";
import LoaderComponent from "~/components/loader-component";
import { getMetadataFromAssetName } from "~/lib/get/get-metadata-id-from-asset-name";

export default function Validator({
  handleValidating,
}: {
  handleValidating: Dispatch<SetStateAction<boolean>>;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const validationsCollection =
    useRxCollection<ValidationsCollection>("validations");

  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find(),
  );

  const { result: rulesResults, isFetching: isFetchingRules } =
    useRxData<RulesCollection>("rules", (collection) =>
      collection.findByIds([activeProject?.id ?? ""]),
    );

  if (isFetching || isFetchingRules) return <LoaderComponent />;

  const metadata: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  const rules: RulesCollection | undefined = rulesResults.map(
    (doc) => doc.toJSON() as RulesCollection,
  )[0];

  const project = activeProject?._data;

  if (!metadata || !project || !rules) return null;

  const handleValidation = async () => {
    try {
      handleValidating(true);

      // Validate the metadata
      const validations = await validateMetadata(metadata, rules);
      // Add validations in RXDB
      await validationsCollection?.bulkUpsert(
        Object.keys(validations).map((assetName) => ({
          id: getMetadataFromAssetName(metadata, assetName),
          assetName,
          validation: validations[assetName],
        })),
      );

      // Set the status in metadata
      const metadataWithStatus = setMetadataStatusFromValidations(
        metadata,
        validations,
      );
      // Update Metadata in RxDB
      await metadataCollection?.bulkUpsert(metadataWithStatus);

      // Get project information
      const stats = getStats(metadataWithStatus);
      const newProject = {
        ...project,
        ...stats,
      };

      // Add project information in RXDB
      await projectCollection?.upsert(newProject);
    } catch (error) {
    } finally {
      handleValidating(false);
    }
  };

  return (
    <Button variant={"successOutline"} onClick={handleValidation}>
      Validate Metadata
    </Button>
  );
}


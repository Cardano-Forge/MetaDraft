import React from "react";
import { JsonEditor, UpdateFunction } from "json-edit-react";

import type {
  MetadataCollection,
  ProjectCollection,
  ValidationsCollection,
} from "~/lib/types";
import { MetadataCollectionSchemav2 } from "~/lib/zod-schemas";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import {
  editOnAdd,
  editRestrictionAdd,
  editRestrictionDelete,
  editRestrictionEdit,
  jerRestrictTypeSelection,
  jerTheme,
} from "~/lib/json-editor";
import { useActiveProject } from "~/providers/active-project.provider";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { validateMetadata } from "~/server/validations";
import { setMetadataStatusFromValidations } from "~/lib/set-metadata-status-from-validation";
import { getStats } from "~/lib/get/get-stats";
import Loader from "~/components/loader";

export default function JSONEditor({
  metadata,
  handleValidation,
}: {
  metadata: MetadataCollection;
  handleValidation: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [meta, setMeta] = React.useState<
    Omit<MetadataCollection, "id" | "status">
  >({ assetName: metadata.assetName, metadata: metadata.metadata });
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const validationsCollection =
    useRxCollection<ValidationsCollection>("validations");

  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find(),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadatas: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  const project = activeProject?._data;

  if (!metadatas || !project) return null;

  const handleSaveAndValidate = async () => {
    try {
      handleValidation(true);
      const newMetadatas = metadatas.map((m) =>
        m.id === metadata.id ? { ...metadata, ...meta } : m,
      );

      // Validate the metadata
      const validations = await validateMetadata(newMetadatas);
      await validationsCollection?.bulkUpsert(
        Object.keys(validations).map((assetName) => ({
          id: self.crypto.randomUUID(),
          assetName,
          validation: validations[assetName],
        })),
      );
      // Set the status in metadata
      const metadataWithStatus = setMetadataStatusFromValidations(
        newMetadatas,
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
      handleValidation(false);
    }
  };

  const handleOnUpdate: UpdateFunction = ({ newData }) => {
    console.log("ON EDIT");
    // todo check newData === template key:valueType

    // Zod Validation on update
    const zodResults = MetadataCollectionSchemav2.safeParse(newData);
    if (!zodResults.success) {
      const errorMessage = zodResults.error.issues
        ?.map((error) => `${error.message}`)
        .join("\n");
      // This string returned to and displayed in json-edit-react UI
      return errorMessage;
    }

    if (zodResults.success) {
      setMeta(zodResults.data);
    }
  };

  return (
    <div className="flex min-w-[60%] flex-col gap-4 rounded-xl bg-secondary p-4 px-8">
      <div className="flex flex-row items-center justify-between px-2">
        <Typography as="h2">JSON Editor</Typography>
        <Button onClick={handleSaveAndValidate}>Save and Validate</Button>
      </div>
      <Typography className="italic text-white/50">
        To edit a key, double-click it. Press Enter to save, or Esc to cancel.
      </Typography>
      <Typography className="italic text-white/50">
        To edit a value, double-click it.
      </Typography>
      <JsonEditor
        data={meta}
        showErrorMessages
        enableClipboard={false}
        defaultValue={""}
        rootFontSize={18}
        minWidth={"100%"}
        collapse={3}
        className="jer-custom jer-custom-edit"
        theme={jerTheme}
        restrictEdit={editRestrictionEdit}
        restrictAdd={editRestrictionAdd}
        restrictDelete={editRestrictionDelete}
        restrictTypeSelection={jerRestrictTypeSelection}
        onAdd={editOnAdd}
        onUpdate={handleOnUpdate}
      />
    </div>
  );
}

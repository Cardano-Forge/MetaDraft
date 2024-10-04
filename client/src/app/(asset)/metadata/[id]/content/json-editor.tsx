import React from "react";
import { JsonEditor, type UpdateFunction } from "json-edit-react";

import type {
  MetadataCollection,
  ProjectCollection,
  RulesCollection,
  ValidationsCollection,
} from "~/lib/types";
import { MetadataCollectionSchemaV2 } from "~/lib/zod-schemas";
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
import LoaderComponent from "~/components/loader-component";

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

  const { result: rulesResults, isFetching: isFetchingRules } =
    useRxData<RulesCollection>("rules", (collection) =>
      collection.findByIds([activeProject?.id ?? ""]),
    );

  if (isFetching || isFetchingRules) return <LoaderComponent />;

  const metadatas: MetadataCollection[] = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  );

  const rules: RulesCollection | undefined = rulesResults.map(
    (doc) => doc.toJSON() as RulesCollection,
  )[0];

  const project = activeProject?._data;

  if (!metadatas || !project || !rules) return null;

  const handleSaveAndValidate = async () => {
    try {
      handleValidation(true);
      const newMetadatas = metadatas.map((m) =>
        m.id === metadata.id ? { ...metadata, ...meta } : m,
      );

      // Validate the metadata
      const validations = await validateMetadata(newMetadatas, rules);
      await validationsCollection?.bulkUpsert(
        Object.keys(validations).map((assetName) => ({
          id: assetName,
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

  const handleOnUpdate: UpdateFunction = ({
    newData,
    name,
    path,
    newValue,
  }) => {
    if (
      typeof name === "number" &&
      typeof newValue === "string" &&
      newValue.length === 0
    ) {
      deleteByPath(newData as Omit<MetadataCollection, "id" | "status">, path);
    }

    // Zod Validation on update
    const zodResults = MetadataCollectionSchemaV2.safeParse(newData);
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
    <div className="flex min-w-[60%] flex-col gap-4 rounded-xl bg-card p-4 px-8">
      <div className="flex flex-row items-center justify-between">
        <Typography as="h2">JSON Editor</Typography>
        <Button onClick={handleSaveAndValidate}>Save and Validate</Button>
      </div>
      <Typography className="italic text-white/50">
        To edit a key, double-click it. Press Enter to save, or Esc to cancel.
      </Typography>
      <Typography className="italic text-white/50">
        To delete an element from string array. Set the value to an empty
        string.
      </Typography>
      <JsonEditor
        data={meta}
        showErrorMessages
        enableClipboard={false}
        defaultValue={"null"}
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

/**
 * Function to delete a value by path in a type-safe way
 */
function deleteByPath<T extends object>(
  obj: T,
  path: (string | number)[],
): void {
  const lastKey = path.pop(); // Remove the last key (index 1 in this case)

  // Access the parent of the value we want to delete
  const parent = path.reduce<unknown>((acc, key) => {
    if (acc && (typeof acc === "object" || Array.isArray(acc))) {
      return acc[key as keyof typeof acc];
    }
    return undefined;
  }, obj);

  if (parent && typeof lastKey === "number" && Array.isArray(parent)) {
    parent.splice(lastKey, 1); // Remove the element at the array index
  } else if (parent && typeof lastKey === "string") {
    delete parent[lastKey as keyof typeof parent]; // Delete the key if it's an object
  }
}

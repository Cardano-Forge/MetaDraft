import React from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { JsonEditor, UpdateFunction } from "json-edit-react";

import LoaderComponent from "~/components/loader-component";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { DEFAULT_CIP25_SCHEMA } from "~/lib/constant";
import {
  createRestrictionAdd,
  createRestrictionDelete,
  createRestrictionEdit,
  jerRestrictTypeSelection,
  jerTheme,
} from "~/lib/json-editor";
import {
  MetadataCollection,
  MetadataCollectionEditor,
  MetadataSchemaCollection,
} from "~/lib/types";
import { MetadataCollectionSchemaV2 } from "~/lib/zod-schemas";
import { reconcileWithSchema } from "~/lib/reconcile-with-schema";
import HowToCreateMetadataSchema from "./how-to";

export default function JSONCreator({
  metadatas,
  structure,
}: {
  metadatas: MetadataCollection[];
  structure?: MetadataCollectionEditor;
}) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [metadataSchema, setMetadataSchema] =
    React.useState<MetadataCollectionEditor>(structure ?? DEFAULT_CIP25_SCHEMA);
  const metadataSchemaCollection =
    useRxCollection<MetadataSchemaCollection>("metadataSchema");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");

  if (loading) return <LoaderComponent />;

  console.log(metadatas.length);

  const handleOnAdd: UpdateFunction = ({ newData, currentData, path }) => {
    const data = currentData as MetadataCollection;
    // When adding in files[] add base element { src: "string", mediaType: "string" }
    if (
      path.length === 3 &&
      path.includes("metadata") &&
      path.includes("files")
    ) {
      const newAddInFiles = {
        ...data,
        metadata: {
          ...data.metadata,
          files: [
            ...(data.metadata.files ?? []),
            { src: "string", mediaType: "string" },
          ],
        },
      };
      setMetadataSchema(newAddInFiles as MetadataCollectionEditor);
      return ["value", newAddInFiles];
    }

    setMetadataSchema(newData as MetadataCollectionEditor);
    return true;
  };

  const handleOnUpdate: UpdateFunction = ({ newData }) => {
    // Zod Validation on update
    const zodResults = MetadataCollectionSchemaV2.safeParse(newData);
    if (!zodResults.success) {
      const errorMessage = zodResults.error.issues
        ?.map((error) => `${error.message}`)
        .join("\n");
      // This string returned to and displayed in json-edit-react UI
      return errorMessage;
    }

    // Save in React state
    if (zodResults.success) {
      setMetadataSchema(zodResults.data);
    }
  };

  const handleSaveSchema = async () => {
    try {
      setLoading(true);
      // Save Schema
      await metadataSchemaCollection?.upsert({
        id: "schema",
        schema: metadataSchema,
      });

      metadatas.map((m) =>
        console.log({ ...m, ...reconcileWithSchema(metadataSchema, m) }),
      );
      console.log(metadatas.length);

      // Add metadata in RXDB
      await metadataCollection?.bulkUpsert(
        metadatas.map((m) => ({
          ...m,
          ...reconcileWithSchema(metadataSchema, m),
        })),
      );
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-w-[60%] flex-col gap-4 rounded-xl bg-card p-4 px-8">
      <div className="flex flex-row items-center justify-between">
        <Typography as="h2">JSON Creator</Typography>
        <Button onClick={handleSaveSchema}>Save Metadata Structure</Button>
      </div>
      <JsonEditor
        data={metadataSchema}
        collapse
        showErrorMessages
        enableClipboard={false}
        defaultValue={"string"}
        rootFontSize={18}
        minWidth={"100%"}
        className="jer-custom"
        theme={jerTheme}
        restrictEdit={createRestrictionEdit}
        restrictAdd={createRestrictionAdd}
        restrictDelete={createRestrictionDelete}
        restrictTypeSelection={jerRestrictTypeSelection}
        onAdd={handleOnAdd}
        onUpdate={handleOnUpdate}
      />

      <HowToCreateMetadataSchema />
    </div>
  );
}

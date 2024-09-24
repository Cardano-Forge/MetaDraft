import React from "react";
import { JsonEditor } from "json-edit-react";

import type { MetadataCollection } from "~/lib/types";
import { MetadataCollectionSchema } from "~/lib/zod-schemas";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

const attributesRegex = /metadata\.attributes\..*/;
const imageArrayRegex = /metadata\.image\.\d+/;
const filesSrcArrayRegex = /metadata\.files\.src\.\d+/;

export default function JSONEditor({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const [meta, setMeta] = React.useState<MetadataCollection>(metadata);

  const handleSaveAndValidate = () => {
    alert("save and validate");
  };

  return (
    <div className="flex min-w-[60%] flex-col gap-4 rounded-xl bg-secondary p-4 px-8">
      <div className="flex flex-row items-center justify-between px-2">
        <Typography as="h2">JSON Editor</Typography>
        <Button onClick={handleSaveAndValidate}>Save and Validate</Button>
      </div>
      <JsonEditor
        data={meta}
        showErrorMessages
        enableClipboard={false}
        defaultValue={""}
        rootFontSize={20}
        minWidth={"100%"}
        // Theming
        theme={[
          "monoDark",
          {
            container: {
              backgroundColor: "hsl(260 14% 8%)",
              border: "1px solid #ffffff33",
            },

            iconAdd: "hsl(140 55% 57%)",
            iconEdit: "hsl(33 100% 74%)",
            iconDelete: "hsl(357 100% 65%)",
            iconOk: "hsl(140 55% 57%)",
            iconCancel: "hsl(357 100% 65%)",
          },
        ]}
        // Restrictions
        restrictEdit={({ level, key, size, value }) => {
          console.log(value);
          return (
            level === 0 ||
            key === "status" ||
            key === "id" ||
            typeof value === "object" ||
            Array.isArray(value)
          );
        }} // Can only edit assetName && metadata
        restrictAdd={({ level, key }) =>
          level === 0 || key === "status" || key === "id" || key === "assetName"
        } // Can only add in metadata
        restrictDelete={({ level }) => level === 0 || level === 1} // Cannot delete at root level & id or assetName or metadata or status
        restrictTypeSelection={({ path }) => {
          console.log(path);
          // AssetName
          if (path.includes("assetName")) return []; // String only
          // metadata.name
          if (path.join(".") === "metadata.name") return []; // String only
          //metadata.image
          if (path.join(".") === "metadata.image") return ["string", "array"];
          //metadata.image[*]
          if (imageArrayRegex.test(path.join("."))) return []; // String only
          // metadata.website
          if (path.join(".") === "metadata.website") return []; // String only
          //metadata.files.src
          if (
            path.includes("metadata") &&
            path.includes("files") &&
            path.includes("src")
          )
            return ["string", "array"];
            
          //metadata.files.src[*]
          if (filesSrcArrayRegex.test(path.join("."))) return []; // String only
          //metadata.image
          if (
            path.includes("metadata") &&
            path.includes("files") &&
            path.includes("mediaType")
          )
            return []; // String only

          //metadata.image
          if (attributesRegex.test(path.join("."))) return []; // String only
          return ["string", "number", "array", "object"]; // Only 4 type accepted
        }}
        onAdd={({ currentData, path }) => {
          const data = currentData as MetadataCollection;
          if (
            path.length === 3 &&
            path.includes("metadata") &&
            path.includes("files")
          ) {
            return [
              "value",
              {
                ...data,
                metadata: {
                  ...data.metadata,
                  files: [
                    ...(data.metadata.files ?? []),
                    { src: "", mediaType: "" },
                  ],
                },
              },
            ];
          }
          return true;
        }}
        // Zod Validation on update
        onUpdate={({ newData }) => {
          const zodResults = MetadataCollectionSchema.safeParse(newData);
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
        }}
      />
    </div>
  );
}

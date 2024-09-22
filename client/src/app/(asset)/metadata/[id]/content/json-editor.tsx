import React from "react";
import { JsonEditor } from "json-edit-react";

import type { MetadataCollection } from "~/lib/types";
import { MetadataCollectionSchema } from "~/lib/zod-schemas";
import { Typography } from "~/components/typography";
import { toast } from "sonner";

export default function JSONEditor({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const [meta, setMeta] = React.useState<MetadataCollection>(metadata);

  return (
    <div className="flex min-w-[50%] flex-col gap-4 rounded-xl bg-secondary p-4 px-8">
      <Typography as="h2">JSON Editor</Typography>
      <JsonEditor
        data={meta}
        showErrorMessages
        enableClipboard={false}
        defaultValue={"undefined"}
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
        restrictEdit={({ level, key }) =>
          level === 0 || key === "status" || key === "id"
        } // Can only edit assetName && metadata
        restrictAdd={({ level, key }) =>
          level === 0 || key === "status" || key === "id" || key === "assetName"
        } // Can only add in metadata
        restrictDelete={({ level }) => level === 0 || level === 1} // Cannot delete at root level & id or assetName or metadata or status
        restrictTypeSelection={({ path }) => {
          if (path.includes("assetName")) return ["string"]; // Only string for asssetName
          return ["string", "number", "array", "object"]; // Only 4 type accepted
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

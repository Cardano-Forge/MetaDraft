import React from "react";
import { JsonEditor } from "json-edit-react";

import type { MetadataCollection } from "~/lib/types";
import { MetadataCollectionSchema } from "~/lib/zod-schemas";

export default function JSONEditor({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const [meta, setMeta] = React.useState<MetadataCollection>(metadata);

  return (
    <div className="flex flex-col gap-4">
      <JsonEditor
        data={meta}
        showErrorMessages
        enableClipboard={false}
        restrictEdit={({ level, key }) =>
          level === 0 || key === "status" || key === "id"
        } // Can only edit assetName && metadata
        restrictAdd={({ level, key }) =>
          level === 0 || key === "status" || key === "id" || key === "assetName"
        } // Can only add in metadata
        restrictDelete={({ level }) => level === 0 || level === 1} // Cannot delete at root level & id or assetName or metadata or status
        onUpdate={({ newData }) => {
          const zodResults = MetadataCollectionSchema.safeParse(newData);
          if (!zodResults.success) {
            console.log("Errors", zodResults.error);
            // const errorMessage = validate.errors
            //   ?.map((error) => `${error.instancePath}${error.instancePath ? ': ' : ''}${error.message}`)
            //   .join('\n')
            // // Send detailed error message to an external UI element, such as a "Toast" notification
            //  displayError({
            //   title: 'Not compliant with JSON Schema',
            //   description: errorMessage,
            //   status: 'error',
            // })
            // This string returned to and displayed in json-edit-react UI
            return "JSON Schema error";
          }
        }}
      />
    </div>
  );
}

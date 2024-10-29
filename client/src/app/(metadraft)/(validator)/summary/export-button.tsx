"use client";

import { type RxDumpCollection } from "rxdb";
import { useRxCollection } from "rxdb-hooks";

import { Button } from "~/components/ui/button";
import CodeIcon from "~/icons/code.icon";
import type {
  MetadataCollection,
  MetatdataJSON,
  ProjectCollection,
} from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";

export default function ExportButton() {
  const activeProject = useActiveProject();
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const project = activeProject?.toJSON() as ProjectCollection;

  const handleExport = async () => {
    const json = await metadataCollection?.exportJSON(); // Export from RxDB
    const metadata = formatMetadata(json); // Format to MetadataJSON[]
    const metadataString = JSON.stringify(metadata, null, "\t"); // Convert the JSON object to a string
    const blob = new Blob([metadataString], { type: "application/json" }); // Create a Blob from the JSON string
    const url = URL.createObjectURL(blob); // Create a URL for the Blob object
    const link = document.createElement("a"); // Create a temporary link element
    link.href = url; // Append the url to the link element
    link.download = `${project.name}.json`; // Set the download attribute with the desired file name
    document.body.appendChild(link); // Append the link to the document
    link.click(); // Click it to trigger the download
    document.body.removeChild(link); // Clean up by removing the link
    URL.revokeObjectURL(url); // Revoking the URL
  };

  return (
    <Button className="flex flex-row gap-3" onClick={handleExport}>
      <CodeIcon /> Export the project
      <span className="sr-only">
        Take the current metadata and export it as JSON format.
      </span>
    </Button>
  );
}

const formatMetadata = (
  JSON: RxDumpCollection<MetadataCollection> | undefined,
): MetatdataJSON[] => {
  const documents = JSON?.docs;
  if (!documents) return [];

  const metadatas = documents.map(
    ({ assetName, metadata }) =>
      ({
        assetName,
        metadata,
      }) as unknown as MetatdataJSON,
  );

  return metadatas;
};

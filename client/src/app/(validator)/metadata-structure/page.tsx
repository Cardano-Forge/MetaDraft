"use client";

import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

import type { Metadata } from "~/lib/db/types";
import { getObjectStructure } from "~/lib/get/get-object-structure";
import { useActiveProject } from "~/providers/active-project.provider";
import JSONViewer from "./json-viewer";
import FormSection from "./form-section";

export default function StructurePage() {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<Metadata>("metadata", (collection) =>
    collection.findByIds([activeProject?.metadataId ?? ""]),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata = result[0]?.data;

  if (!activeProject || !metadata) return <div>No data found.</div>;

  const structure = getObjectStructure(metadata[0]?.metadata);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Metadata Structure</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          {/* <Button onClick={handleTest}>Test</Button> */}
        </div>
      </div>
      <FormSection structure={structure} />
      <JSONViewer json={metadata[0]?.metadata} />
    </div>
  );
}

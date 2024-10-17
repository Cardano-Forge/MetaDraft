import React from "react";
import { useRxCollection } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import type {
  MetadataCollection,
  ProjectCollection,
  Status,
} from "~/lib/types";
import { cn } from "~/lib/utils";
import { useActiveProject } from "~/providers/active-project.provider";
import { keys } from "~/lib/constant";

export default function HeaderActions({
  metadata,
  isValidating,
}: {
  metadata: MetadataCollection;
  isValidating: boolean;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");

  const project = activeProject?.toJSON() as ProjectCollection;

  if (!metadata || !project) return <div>No metadata found</div>;

  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";

  const handleStatusUpdate = async (state: Status) => {
    const currentState = metadata.status;
    await metadataCollection?.upsert({
      ...metadata,
      status: state === currentState ? "error" : state,
    });

    const newProject = {
      ...project,
    };
    // Remove stats
    newProject[keys[currentState]]--;
    // Add stats
    newProject[keys[state === currentState ? "error" : state]]++;

    // Add project information in RXDB
    await projectCollection?.upsert(newProject);
  };

  return (
    <div className="pt-auto flex flex-row gap-4">
      <Button
        disabled={isValidating}
        variant={isWarning ? "warning" : "warningOutilne"}
        className={cn("gap-4", isWarning && "border-background")}
        onClick={async () => {
          await handleStatusUpdate("warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
        Flag an error
      </Button>
      <Button
        disabled={isValidating}
        variant={isSuccess ? "success" : "successOutline"}
        className={cn("gap-4", isSuccess && "border-background")}
        onClick={async () => {
          await handleStatusUpdate("success");
        }}
      >
        <CheckIcon />
        Mark as valid
      </Button>
    </div>
  );
}

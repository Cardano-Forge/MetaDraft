import React from "react";
import { useRxCollection, useRxData } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import SummaryIcon from "~/icons/summary.icon";
import type {
  MetadataCollection,
  ProjectCollection,
  Status,
  ValidationsCollection,
} from "~/lib/types";
import { cn } from "~/lib/utils";
import { useActiveProject } from "~/providers/active-project.provider";
import { keys } from "~/lib/constant";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { getErrorCountMessage } from "~/lib/get/get-error-count-message";
import { Separator } from "~/components/ui/separator";
import ErrorSummaryAccordion from "~/components/error-summary-accordion";

export default function HeaderActions({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");

  const { result, isFetching } = useRxData<ValidationsCollection>(
    "validations",
    (collection) =>
      collection.find().where("assetName").equals(metadata.assetName),
  );

  if (isFetching) return <div>Loading...</div>;

  const validations = result.map(
    (doc) => doc.toJSON() as ValidationsCollection,
  );

  const validation = validations[0];

  const project = activeProject?._data;

  if (!metadata || !project || !validation) return <div>No metadata found</div>;

  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";
  const isUnchecked = metadata.status === "unchecked";

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
      <Dialog>
        <DialogTrigger asChild>
          <Button
            disabled={
              isSuccess ||
              isUnchecked ||
              !getErrorCountMessage(validation?.validation).length // Check if there is a warning or an error
            }
            variant={"outline"}
            className="gap-4"
          >
            <SummaryIcon /> Errors summary
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-hidden !rounded-2xl border-none px-0 pb-0 md:max-h-[calc(100vh-4rem)]">
          <DialogHeader className="px-10">
            <DialogTitle className="text-xl font-bold tracking-tight first:mt-0 sm:text-2xl md:text-3xl">
              Errors summary
            </DialogTitle>
            <DialogDescription className="text-border/50">
              {getErrorCountMessage(validation?.validation)}
            </DialogDescription>
          </DialogHeader>
          <Separator className="mt-3 bg-border/20" />

          <ErrorSummaryAccordion
            assetName={metadata.assetName}
            validation={validation}
          />
        </DialogContent>
      </Dialog>

      <Button
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

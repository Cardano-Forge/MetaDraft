import Link from "next/link";
import { useRxCollection } from "rxdb-hooks";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { keys } from "~/lib/constant";
import type {
  MetadataCollection,
  ProjectCollection,
  Status,
  ValidationsCollection,
} from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";
import { cn } from "~/lib/utils";

import ArrowRightIcon from "~/icons/arrow-right.icon";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import TrashIcon from "~/icons/trash.icon";

export default function Actions({
  metadata,
  className,
  card = false,
}: {
  metadata: MetadataCollection;
  className?: string;
  card?: boolean;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const validationsCollection =
    useRxCollection<ValidationsCollection>("validations");

  const project = activeProject?.toJSON() as ProjectCollection;

  if (!metadata || !project) return <div>No metadata found</div>;

  const isUnchecked = metadata.status === "unchecked";
  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";
  const isError = metadata.status === "error";

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

  // todo - add menu for card smaller UI ?

  const handleDelete = async () => {
    await metadataCollection?.bulkRemove([metadata.id]);

    await projectCollection?.upsert({
      ...project,
      nfts: project.nfts - 1,
      valids: project.valids - (isSuccess ? 1 : 0),
      errorsDetected: project.errorsDetected - (isError ? 1 : 0),
      errorsFlagged: project.errorsFlagged - (isWarning ? 1 : 0),
      unchecked: project.unchecked - (isUnchecked ? 1 : 0),
    });

    await validationsCollection?.bulkRemove([metadata.id]);
  };

  return (
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <Button
        title="Mark as flagged"
        disabled={isUnchecked}
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={async (event) => {
          event.stopPropagation();
          await handleStatusUpdate("warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        title="Mark as valid"
        disabled={isUnchecked}
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={async (event) => {
          event.stopPropagation();
          await handleStatusUpdate("success");
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            title="Delete asset"
            size={"icon"}
            variant={"destructiveOutilne"}
            onClick={(event) => event.stopPropagation()}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription className="text-red-500">
              This action will permanently remove the asset from your metadata
              list. Once deleted, it cannot be undone. Please confirm if you
              wish to proceed
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant={"secondary"}
              onClick={handleDelete}
              className="w-full"
            >
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {!card && (
        <Button
          asChild
          size={"icon"}
          variant={"outline"}
          className="border-white/50"
        >
          <Link
            href={`/metadata/${metadata.id}`}
            title="Go to asset page"
            aria-label="Go to asset page"
          >
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  );
}

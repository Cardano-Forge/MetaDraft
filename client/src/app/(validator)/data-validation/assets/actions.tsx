import { useRouter } from "next/navigation";
import { useRxCollection } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import ArrowRightIcon from "~/icons/arrow-right.icon";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import type {
  MetadataCollection,
  ProjectCollection,
  Status,
  ValidationsCollection,
} from "~/lib/types";
import { cn } from "~/lib/utils";
import { useActiveProject } from "~/providers/active-project.provider";
import { keys } from "~/lib/constant";
import TrashIcon from "~/icons/trash.icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function Actions({
  metadata,
  className,
}: {
  metadata: MetadataCollection;
  className?: string;
}) {
  const activeProject = useActiveProject();
  const router = useRouter();
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
        disabled={isUnchecked}
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={async () => {
          await handleStatusUpdate("warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        disabled={isUnchecked}
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={async () => {
          await handleStatusUpdate("success");
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button size={"icon"} variant={"destructiveOutilne"}>
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
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-white/50"
        onClick={() => router.push(`/metadata/${metadata.id}`)}
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

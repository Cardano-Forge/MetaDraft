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
import TrashIcon from "~/icons/trash.icon";
import type {
  MetadataCollection,
  ProjectCollection,
  ValidationsCollection,
} from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";

export default function DeleteButton({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const validationsCollection =
    useRxCollection<ValidationsCollection>("validations");

  const project = activeProject?.toJSON() as ProjectCollection;

  const isUnchecked = metadata.status === "unchecked";
  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";
  const isError = metadata.status === "error";

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
    <Dialog>
      <DialogTrigger asChild>
        <Button
          title="Delete this asset"
          size={"icon"}
          variant={"destructiveOutilne"}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription className="text-red-500">
            This action will permanently remove the asset from your metadata
            list. Once deleted, it cannot be undone. Please confirm if you wish
            to proceed
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
  );
}

import { useRxCollection, useRxData } from "rxdb-hooks";
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

export default function Actions({
  metadata,
  className,
}: {
  metadata: MetadataCollection;
  className?: string;
}) {
  const activeProject = useActiveProject();
  const projectCollection = useRxCollection<ProjectCollection>("project");
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find().where("id").equals(metadata.id),
  );

  if (isFetching) return <div>Loading...</div>;

  const meta = result.map((doc) => doc.toJSON() as MetadataCollection)[0];

  const project = activeProject?._data;

  if (!meta || !project) return <div>No metadata found</div>;

  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";

  const handleStatusUpdate = async (state: Status) => {
    const currentState = meta.status;
    await metadataCollection?.upsert({
      ...meta,
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
    <div className={cn("flex flex-row items-center gap-2", className)}>
      <Button
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={async () => {
          await handleStatusUpdate("warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={async () => {
          await handleStatusUpdate("success");
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

const keys: Record<Status, keyof ProjectCollection> = {
  unchecked: "unchecked",
  error: "errorsDetected",
  warning: "errorsFlagged",
  success: "valids",
};

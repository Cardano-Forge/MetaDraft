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
} from "~/lib/types";
import { cn } from "~/lib/utils";
import { useActiveProject } from "~/providers/active-project.provider";
import { keys } from "~/lib/constant";

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

  const project = activeProject?._data;

  if (!metadata || !project) return <div>No metadata found</div>;

  const isUnchecked = metadata.status === "unchecked";
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
      <Button
        disabled={isUnchecked}
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

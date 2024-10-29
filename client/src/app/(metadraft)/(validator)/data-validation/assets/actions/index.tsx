import { useRxCollection } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import ArrowRightIcon from "~/icons/arrow-right.icon";
import type {
  MetadataCollection,
  ProjectCollection,
  Status,
} from "~/lib/types";
import { cn } from "~/lib/utils";
import { useActiveProject } from "~/providers/active-project.provider";
import { keys } from "~/lib/constant";

import FlaggedButton from "./flagged-button";
import ValidButton from "./valid-button";
import DeleteButton from "./delete-button";
import Link from "next/link";

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

  const project = activeProject?.toJSON() as ProjectCollection;

  if (!metadata || !project) return <div>No metadata found</div>;

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
      <FlaggedButton
        handleStatusUpdate={handleStatusUpdate}
        isWarning={metadata.status === "warning"}
        isUnchecked={metadata.status === "unchecked"}
      />

      <ValidButton
        handleStatusUpdate={handleStatusUpdate}
        isSuccess={metadata.status === "success"}
        isUnchecked={metadata.status === "unchecked"}
      />

      <DeleteButton metadata={metadata} />

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
            <span className="sr-only">
              Navigation to this detailed asset page
            </span>
          </Link>
        </Button>
      )}
    </div>
  );
}

import { useRxCollection, useRxData } from "rxdb-hooks";
import { Button } from "~/components/ui/button";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import type { MetadataCollection, Status } from "~/lib/types";

export default function Actions({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  const metadataCollection = useRxCollection<MetadataCollection>("metadata");
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.find().where("id").equals(metadata.id),
  );

  if (isFetching) return <div>Loading...</div>;

  const meta = result.map((doc) => doc.toJSON() as MetadataCollection)[0];

  if (!meta) return <div>No metadata found</div>;

  const isSuccess = metadata.status === "success";
  const isWarning = metadata.status === "warning";

  const handleStatusUpdate = async (state: Status) => {
    await metadataCollection?.upsert({
      ...meta,
      status: state === meta.status ? "error" : state,
    });
  };
  
  return (
    <div className="flex flex-row items-center gap-2">
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

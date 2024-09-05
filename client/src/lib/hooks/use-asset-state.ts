import { useRxCollection, useRxData } from "rxdb-hooks";
import type { Status } from "~/lib/types";
import type { MetadataStatus } from "../db/types";

export default function useAssetState() {
  const statusCollection = useRxCollection<MetadataStatus>("status");
  const { result, isFetching } = useRxData<MetadataStatus>(
    "status",
    (collection) => collection.findByIds(["assetStatus"]),
  );
  const getState = (assetName: string): Status => {
    const status = result[0]?.status;
    if (!status) return "error";
    return status[assetName]!;
  };

  const updateState = async (assetName: string, state: Status) => {
    try {
      const status = result[0]?.status;
      if (!status) throw new Error("No status found.");
      const newStatus = { ...status, [assetName]: state };
      // Add status in RXDB
      await statusCollection?.upsert({
        id: "assetStatus",
        status: newStatus,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return { isFetching, getState, updateState };
}

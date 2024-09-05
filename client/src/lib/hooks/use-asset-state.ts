import { useRxData } from "rxdb-hooks";
import type { Status } from "~/lib/types";
import type { MetadataStatus } from "../db/types";

export default function useAssetState() {
  const { result, isFetching } = useRxData<MetadataStatus>(
    "status",
    (collection) => collection.findByIds(["assetStatus"]),
  );
  const getState = (assetName: string): Status => {
    const status = result[0]?.status;
    if (!status) return "error";
    return status[assetName]!;
  };

  return { isFetching, getState };
}

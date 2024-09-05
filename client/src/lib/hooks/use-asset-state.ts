import { useRxData } from "rxdb-hooks";
import type { Status } from "~/lib/types";
import type { MetadataValidations } from "../db/types";

export default function useAssetState() {
  const { result, isFetching } = useRxData<MetadataValidations>(
    "validations",
    (collection) => collection.findByIds(["validations"]),
  );

  const getState = (assetName: string): Status => {
    const validations = result[0]?._data.validations;
    if (!validations) return "error";
    return validations[assetName] ? validations[assetName]?.status : "success";
  };

  const getWarnings = (assetName: string) => {
    const validations = result[0]?.validations;
    if (!validations) return undefined;
    return validations[assetName]?.warnings;
  };

  return { isFetching, getState, getWarnings };
}

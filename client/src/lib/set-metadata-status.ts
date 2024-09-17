import type { MetadataCollection, ValidatorResults } from "./types";

export const setMetadataStatus = (
  metadata: MetadataCollection[],
  validations: ValidatorResults,
): MetadataCollection[] => {
  return metadata.map((meta) => ({
    ...meta,
    status: validations[meta.assetName]?.status ?? "success",
  }));
};

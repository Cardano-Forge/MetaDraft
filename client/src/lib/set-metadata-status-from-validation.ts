import type { MetadataCollection, ValidatorResults } from "./types";

/**
 * Updates the status of each metadata item based on the provided validation results.
 *
 * @param {MetadataCollection[]} metadata - An array of metadata collections to be updated.
 * @param {ValidatorResults} validations - An object containing validation results indexed by asset names.
 *   Each entry should have a `status` property that will be used to update the corresponding metadata item.
 * @returns {MetadataCollection[]} - A new array of metadata collections with updated statuses based on validation results.
 *
 */
export const setMetadataStatusFromValidations = (
  metadata: MetadataCollection[],
  validations: ValidatorResults,
): MetadataCollection[] => {
  return metadata.map((meta) => ({
    ...meta,
    status: validations[meta.assetName]?.status ?? "success",
  }));
};

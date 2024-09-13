import type { MetatdataJSON, Status, ValidatorResults } from "../types";

/**
 * Retrieves the validation status for each asset in the metadata.
 *
 * @param {MetatdataJSON} metadata - The metadata array containing information about assets.
 * @param {ValidatorResults} validations - An object containing validation results for each asset.
 * @returns {Record<string, Status>} An object where the keys are asset names and the values are their validation status. Defaults to "success" if a status is not provided.
 */
export const getStatus = (
  metadata: MetatdataJSON,
  validations: ValidatorResults,
): Record<string, Status> => {
  const status: Record<string, Status> = {};
  metadata.map((meta) => {
    status[meta.assetName] = validations[meta.assetName]?.status ?? "success";
  });

  return status;
};

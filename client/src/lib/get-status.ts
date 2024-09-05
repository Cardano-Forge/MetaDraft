import type { MetatdataJSON, Status, ValidatorResults } from "./types";

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

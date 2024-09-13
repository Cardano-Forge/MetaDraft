import type { Status, ValidatorResults } from "../types";

type Stats = {
  nfts: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

/**
 * Calculates statistics based on the results of validations.
 *
 * @param {ValidatorResults} data - An object containing the results of validations for each key.
 *     Each key corresponds to a validation result, which has a status that can be "error" or "warning".
 * @param {number} total - The total number of NFTs (non-fungible tokens).
 *
 * @returns {Stats} An object containing statistics including:
 *     - `nfts`: The total number of NFTs.
 *     - `errorsDetected`: The total number of errors detected across all validation results.
 *     - `errorsFlagged`: The total number of warnings flagged across all validation results.
 *     - `valids`: The total number of valid results (calculated as total NFTs minus the number of validations).
 *
 * Example:
 * ```js
 * const data = {
 *   "1": { status: "error" },
 *   "2": { status: "warning" },
 *   "3": { status: "valid" },
 * };
 * const total = 5;
 * const stats = getStatsFromValidations(data, total);
 * // Output: { nfts: 5, errorsDetected: 1, errorsFlagged: 1, valids: 2 }
 * ```
 */
export const getStatsFromValidations = (
  data: ValidatorResults,
  total: number,
): Stats => {
  const size = Object.keys(data).length;
  const stats = {
    nfts: total,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: total - size,
  };

  Object.keys(data).forEach((key) => {
    if (data[key]?.status === "error") stats.errorsDetected++;
    if (data[key]?.status === "warning") stats.errorsFlagged++;
  });

  return stats;
};

/**
 * Calculates statistics based on the status of validations.
 *
 * @param {Record<string, Status>} status - An object where each key corresponds to an entity (e.g., NFT),
 *     and the value is the validation status, which can be "error", "warning", or "success".
 *
 * @returns {Stats} An object containing statistics including:
 *     - `nfts`: The total number of entities (e.g., NFTs).
 *     - `errorsDetected`: The total number of errors across all statuses.
 *     - `errorsFlagged`: The total number of warnings across all statuses.
 *     - `valids`: The total number of successful validations.
 *
 * Example:
 * ```js
 * const status = {
 *   "1": "error",
 *   "2": "warning",
 *   "3": "success",
 *   "4": "success",
 * };
 * const stats = getStatsFromStatus(status);
 * // Output: { nfts: 4, errorsDetected: 1, errorsFlagged: 1, valids: 2 }
 * ```
 */
export const getStatsFromStatus = (status: Record<string, Status>) => {
  const size = Object.keys(status).length;
  const stats = {
    nfts: size,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: 0,
  };

  Object.keys(status).forEach((key) => {
    if (status[key] === "error") stats.errorsDetected++;
    if (status[key] === "warning") stats.errorsFlagged++;
    if (status[key] === "success") stats.valids++;
  });

  return stats;
};

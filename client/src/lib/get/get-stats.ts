import type { MetadataCollection } from "../types";

/**
 * Represents statistics for a collection of NFTs.
 *
 * @typedef {Object} Stats
 * @property {number} nfts - The total number of NFTs in the collection.
 * @property {number} unchecked - The number of NFTs that have not been checked.
 * @property {number} errorsDetected - The number of NFTs that were detected with errors.
 * @property {number} errorsFlagged - The number of NFTs that were flagged with warnings.
 * @property {number} valids - The number of NFTs that are valid (success status).
 */
type Stats = {
  nfts: number;
  unchecked: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

/**
 * Calculates statistics from an array of metadata collections.
 *
 * @param {MetadataCollection[]} data - An array of metadata collections representing NFTs.
 * @returns {Stats} - An object containing the statistics for the collection of NFTs.
 *
 */
export const getStats = (data: MetadataCollection[]): Stats => {
  const size = data.length;
  const stats = {
    nfts: size,
    unchecked: 0,
    errorsDetected: 0,
    errorsFlagged: 0,
    valids: 0,
  };

  data.forEach((metadata) => {
    if (metadata.status === "error") stats.errorsDetected++;
    if (metadata.status === "warning") stats.errorsFlagged++;
    if (metadata.status === "success") stats.valids++;
  });

  return stats;
};

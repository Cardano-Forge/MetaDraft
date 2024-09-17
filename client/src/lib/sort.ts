import type { MetadataCollection, SortOptionKey, Status } from "./types";

/**
 * Sorts an array of metadata collections based on the specified sorting option.
 *
 * @param {MetadataCollection[]} metadata - The array of metadata collections to be sorted.
 * @param {SortOptionKey | null} sortBy - The key indicating the sorting option. If `null`, sorts alphabetically by default.
 *   - If `sortBy` is "errors" or "success", it first sorts alphabetically before applying the specific sorting function.
 * @returns {MetadataCollection[]} - The sorted array of metadata collections.
 *
 * @throws {TypeError} - Throws an error if the sorting function for `sortBy` is not defined.
 */
export const sort = (
  metadata: MetadataCollection[],
  sortBy: SortOptionKey | null,
): MetadataCollection[] => {
  if (!sortBy) return metadata.sort(sortAZ); // Alpha sort on default

  // Alpha sort before status sorting
  if (sortBy === "errors" || sortBy === "success") metadata.sort(sortAZ);

  // Sorting...
  return metadata.sort(sortFunctions[sortBy]);
};

/**
 * Sorts two metadata objects alphabetically by asset name in ascending order (A to Z).
 *
 * @param {MetadataCollection} a - The first metadata object.
 * @param {MetadataCollection} b - The second metadata object.
 * @returns {number} - A negative number if `a` comes before `b`, a positive number if `b` comes before `a`, or zero if they are equal.
 */
const sortAZ = (a: MetadataCollection, b: MetadataCollection) =>
  a.assetName.localeCompare(b.assetName);

/**
 * Sorts two metadata objects alphabetically by asset name in descending order (Z to A).
 *
 * @param {MetadataCollection} a - The first metadata object.
 * @param {MetadataCollection} b - The second metadata object.
 * @returns {number} - A negative number if `b` comes before `a`, a positive number if `a` comes before `b`, or zero if they are equal.
 */
const sortZA = (a: MetadataCollection, b: MetadataCollection) =>
  b.assetName.localeCompare(a.assetName);

/**
 * Sorts two metadata objects based on their validation status with a priority on errors.
 *
 * @param {MetadataCollection} a - The first metadata object.
 * @param {MetadataCollection} b - The second metadata object.
 * @returns {number} - A negative number if `a` has a higher priority than `b`, or vice versa.
 */
const sortErrors = (a: MetadataCollection, b: MetadataCollection) =>
  errorsOrder[a.status] - errorsOrder[b.status];

/**
 * Sorts two metadata objects based on their validation status with a priority on successes.
 *
 * @param {MetadataCollection} a - The first metadata object.
 * @param {MetadataCollection} b - The second metadata object.
 * @returns {number} - A negative number if `a` has a higher priority than `b`, or vice versa.
 */
const sortSuccess = (a: MetadataCollection, b: MetadataCollection) =>
  successOrder[a.status] - successOrder[b.status];

/**
 * A map of sorting functions, keyed by sort option.
 */
const sortFunctions: Record<
  SortOptionKey,
  (a: MetadataCollection, b: MetadataCollection) => number
> = {
  a_z: sortAZ,
  z_a: sortZA,
  errors: sortErrors,
  success: sortSuccess,
};

/**
 * A map of validation statuses to sorting priority for errors.
 */
const errorsOrder: Record<Status, number> = {
  error: 1,
  warning: 2,
  success: 3,
  unchecked: 4,
};

/**
 * A map of validation statuses to sorting priority for successes.
 */
const successOrder: Record<Status, number> = {
  success: 1,
  warning: 2,
  error: 3,
  unchecked: 4,
};

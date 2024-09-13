import type { MetatdataJSON, SortOptionKey, Status } from "./types";

/**
 * Sorts the metadata based on the selected sort option and validation statuses.
 *
 * @param {MetatdataJSON} metadata - The array of metadata to be sorted.
 * @param {SortOptionKey | null} sortBy - The key to determine the sort order (e.g., "a_z", "z_a", etc.). If `null`, no sorting is applied.
 * @param {Record<string, Status> | undefined} validations - A map of asset names to their validation statuses (e.g., "error", "warning", "success"). If `undefined`, no sorting is applied.
 * @returns {MetatdataJSON} - The sorted metadata array.
 */
export const sort = (
  metadata: MetatdataJSON,
  sortBy: SortOptionKey | null,
  validations: Record<string, Status> | undefined,
): MetatdataJSON => {
  if (!sortBy || !validations)
    return metadata.sort((a, b) => a.assetName.localeCompare(b.assetName)); // Alpha sort on default

  // Alpha sort before status sorting
  if (sortBy === "errors" || sortBy === "success")
    metadata.sort((a, b) => a.assetName.localeCompare(b.assetName));

  // Sorting...
  return metadata.sort((a, b) =>
    sortFunctions[sortBy](
      { ...a, status: validations[a.assetName] ?? "success" },
      { ...b, status: validations[b.assetName] ?? "success" },
    ),
  );
};

type MetadataStatus = MetatdataJSON[number] & { status: Status };

/**
 * Sorts two metadata objects alphabetically by asset name in ascending order (A to Z).
 *
 * @param {MetadataStatus} a - The first metadata object.
 * @param {MetadataStatus} b - The second metadata object.
 * @returns {number} - A negative number if `a` comes before `b`, a positive number if `b` comes before `a`, or zero if they are equal.
 */
const sortAZ = (a: MetadataStatus, b: MetadataStatus) =>
  a.assetName.localeCompare(b.assetName);

/**
 * Sorts two metadata objects alphabetically by asset name in descending order (Z to A).
 *
 * @param {MetadataStatus} a - The first metadata object.
 * @param {MetadataStatus} b - The second metadata object.
 * @returns {number} - A negative number if `b` comes before `a`, a positive number if `a` comes before `b`, or zero if they are equal.
 */
const sortZA = (a: MetadataStatus, b: MetadataStatus) =>
  b.assetName.localeCompare(a.assetName);

/**
 * Sorts two metadata objects based on their validation status with a priority on errors.
 *
 * @param {MetadataStatus} a - The first metadata object.
 * @param {MetadataStatus} b - The second metadata object.
 * @returns {number} - A negative number if `a` has a higher priority than `b`, or vice versa.
 */
const sortErrors = (a: MetadataStatus, b: MetadataStatus) =>
  errorsOrder[a.status] - errorsOrder[b.status];

/**
 * Sorts two metadata objects based on their validation status with a priority on successes.
 *
 * @param {MetadataStatus} a - The first metadata object.
 * @param {MetadataStatus} b - The second metadata object.
 * @returns {number} - A negative number if `a` has a higher priority than `b`, or vice versa.
 */
const sortSuccess = (a: MetadataStatus, b: MetadataStatus) =>
  successOrder[a.status] - successOrder[b.status];

/**
 * A map of sorting functions, keyed by sort option.
 */
const sortFunctions: Record<
  SortOptionKey,
  (a: MetadataStatus, b: MetadataStatus) => number
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
};

/**
 * A map of validation statuses to sorting priority for successes.
 */
const successOrder: Record<Status, number> = {
  success: 1,
  warning: 2,
  error: 3,
};

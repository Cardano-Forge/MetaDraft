import type { SortOptionKey } from "./types";

/**
 * Determines the sorting key based on a provided string.
 *
 * @param {string | null} sort - The sort option string to be validated.
 * @returns {SortOptionKey | null} - Returns the sort option key if valid, otherwise `null`.
 */
export const getSortBy = (sort: string | null): SortOptionKey | null => {
  if (!sort) return null;
  if (isSortOptionKey(sort)) return sort;
  return null;
};

/**
 * Checks if a given string is a valid SortOptionKey.
 *
 * @param {string} key - The string to check.
 * @returns {key is SortOptionKey} - Returns `true` if the string is a valid `SortOptionKey`, otherwise `false`.
 */
function isSortOptionKey(key: string): key is SortOptionKey {
  return ["a_z", "z_a", "errors", "warning", "success"].includes(key);
}

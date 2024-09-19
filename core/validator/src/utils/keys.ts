import { ZodIssue } from "zod";
import type { KeyWithPaths } from "./types.ts";

/**
 * Recursively extract all keys from an object, keeping track of the path to each key.
 * @category Utils
 * @param obj - The input object to extract keys from.
 * @param path - (Optional) The current path used for nested objects. Defaults to an empty string.
 * @returns {KeyWithPaths[]} An array of objects containing the key and its full path.
 *
 * @example
 * const obj = { a: 1, b: { c: 2 } };
 * console.log(extractKeysWithPaths(obj)); // [{ key: 'a', path: 'a' }, { key: 'b', path: 'b' }, { key: 'c', path: 'b.c' }]
 */
export function extractKeysWithPaths(obj: object, path = ""): KeyWithPaths {
  let keys: KeyWithPaths = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = path ? `${path}.${key}` : key;
    keys.push({ key, path: fullPath });

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      keys = keys.concat(extractKeysWithPaths(value, fullPath));
    }
  }

  return keys;
}

/**
 * Recursively extracts all keys from an object, keeping track of the path to each key.
 * Splits keys found under the "attributes" object into a separate array, while storing other keys in a different array.
 *
 * @category Utils
 * @param {object} obj - The input object to extract keys from.
 * @param {string} [path=""] - The current path for nested objects, defaults to an empty string.
 * @returns {{ attributesKeys: KeyWithPaths[], otherKeys: KeyWithPaths[] }} An object containing two arrays:
 * - `attributesKeys`: Keys found under the "attributes" object, along with their paths.
 * - `otherKeys`: All other keys and their paths.
 *
 * @example
 * const obj = {
 *   a: 1,
 *   b: { c: 2 },
 *   attributes: { d: 3, e: { f: 4 } },
 * };
 *
 * const { attributesKeys, otherKeys } = extractKeysWithPathsSplitAttributes(obj);
 * console.log(attributesKeys); // [{ key: 'd', path: 'attributes.d' }, { key: 'e', path: 'attributes.e' }, { key: 'f', path: 'attributes.e.f' }]
 * console.log(otherKeys); // [{ key: 'a', path: 'a' }, { key: 'b', path: 'b' }, { key: 'c', path: 'b.c' }]
 */
export function extractKeysWithPathsSplitAttributes(
  obj: object,
  path = ""
): {
  attributesKeys: KeyWithPaths;
  otherKeys: KeyWithPaths;
} {
  let attributesKeys: KeyWithPaths = [];
  let otherKeys: KeyWithPaths = [];

  for (const [key, value] of Object.entries(obj)) {
    const fullPath = path ? `${path}.${key}` : key;

    if (key === "attributes") {
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        // Recursively extract keys from the "attributes" object
        attributesKeys = attributesKeys.concat(
          extractKeysWithPathsSplitAttributes(value, fullPath).otherKeys
        );
      }
      continue; // Skip further processing for "attributes" in the otherKeys array
    }

    otherKeys.push({ key, path: fullPath });

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      const nestedResult = extractKeysWithPathsSplitAttributes(value, fullPath);
      attributesKeys = attributesKeys.concat(nestedResult.attributesKeys);
      otherKeys = otherKeys.concat(nestedResult.otherKeys);
    }
  }

  return { attributesKeys, otherKeys };
}

/**
 * Count the occurrences of each key in an array of objects with paths.
 * @category Utils
 * @param keysWithPaths - An array of objects containing keys and their respective paths.
 * @returns {Record<string, number>} A record where keys are the unique keys from the input array,
 * and values are the corresponding occurrence counts.
 *
 * @example
 * const keysWithPaths = [{ key: 'a', path: 'a' }, { key: 'b', path: 'b' }, { key: 'a', path: 'c.a' }];
 * console.log(countKeys(keysWithPaths)); // { a: 2, b: 1 }
 */
export const countKeys = (
  keysWithPaths: KeyWithPaths
): Record<string, number> =>
  keysWithPaths.reduce(
    (acc, { key }) => ({
      ...acc,
      [key]: (acc[key as keyof typeof acc] || 0) + 1,
    }),
    {}
  );

/**
 * Get an array of objects containing the keys that exceed the given threshold and their respective paths.
 * @category Utils
 * @param keysWithPaths - An array of objects containing keys and their respective paths.
 * @param keyCounts - A record where keys are unique keys from the input array, and values are occurrence counts.
 * @param threshold - The minimum number of occurrences for a key to be considered excessive.
 * @returns {Array<{ key: string; path: string }>} An array containing objects with keys that exceed the threshold
 * and their respective paths.
 *
 * @example
 * const keysWithPaths = [{ key: 'a', path: 'a' }, { key: 'b', path: 'b' }, { key: 'a', path: 'c.a' }];
 * const keyCounts = countKeys(keysWithPaths); // { a: 2, b: 1 }
 * console.log(getPathsForExceedingKeys(keysWithPaths, keyCounts, 1)); // [{ key: 'a', path: 'a' }, { key: 'a', path: 'c.a' }]
 */
export function getPathsForExceedingKeys(
  keysWithPaths: KeyWithPaths,
  keyCounts: Record<string, number>,
  threshold: number
): Array<{ key: string; path: string }> {
  // Get the keys that exceed the threshold
  const exceedingKeys = Object.keys(keyCounts).filter(
    (key) => keyCounts[key] && keyCounts[key] > threshold
  );

  // Find paths for these keys
  const paths = keysWithPaths
    .filter(({ key }) => exceedingKeys.includes(key))
    .map(({ key, path }) => ({ key, path }));

  return paths;
}

/**
 * Format the output to match the frontend's expected format.
 * @category Utils
 * @param paths - An array of objects containing keys and their respective paths.
 * @param keyCounts - A record where keys are unique keys from the input array, and values are occurrence counts.
 * @returns {Array<{ field: string; paths: string[]; occurences: number }>} An array containing objects with
 * fields, paths arrays, and occurrences.
 *
 * @example
 * const keysWithPaths = [{ key: 'a', path: 'a' }, { key: 'b', path: 'b' }, { key: 'a', path: 'c.a' }];
 * const keyCounts = countKeys(keysWithPaths); // { a: 2, b: 1 }
 * console.log(formatPaths(keysWithPaths, keyCounts)); // [{ field: 'a', paths: ['a', 'c.a'], occurences: 2 }, { field: 'b', paths: ['b'], occurences: 1 }]
 */
export function formatPaths(
  paths: KeyWithPaths,
  keyCounts: Record<string, number>
): ZodIssue[] {
  const issues: ZodIssue[] = [];

  paths.map(({ key, path }) => {
    if (keyCounts[key] > 1)
      issues.push({
        code: "custom",
        message: `Key "${key}" appear multiple times within the provided metadata.`,
        path: path.split("."),
        params: {
          occurences: keyCounts[key],
          otherPaths: paths
            .map((p) => {
              if (p.key === key && p.path !== path) return p.path.split(".");
            })
            .filter((no_undef) => no_undef),
        },
      });
  });

  return issues;
}

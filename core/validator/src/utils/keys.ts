import type { ZodIssue } from "zod";
import type { KeyWithPaths } from "./types.ts";

/**
 * Recursively extracts all keys from an object along with their full paths.
 *
 * This function traverses an object and records each key along with its full path. Nested objects are processed
 * recursively, and their keys are captured with the appropriate path structure.
 *
 * @param {object} obj - The object from which keys and their paths are to be extracted.
 * @param {string} [path=""] - The base path used to track the full key path. Defaults to an empty string.
 * @returns {KeyWithPaths} - An array of objects, each containing a key and its corresponding path within the object.
 *
 * @example
 * const metadata = {
 *   name: "NFT Name",
 *   attributes: {
 *     trait_type: "Color",
 *     value: "Red"
 *   },
 *   description: "An example NFT"
 * };
 *
 * const result = extractKeysWithPaths(metadata);
 * console.log(result);
 * // Output:
 * // [
 * //   { key: "name", path: "name" },
 * //   { key: "attributes", path: "attributes" },
 * //   { key: "trait_type", path: "attributes.trait_type" },
 * //   { key: "value", path: "attributes.value" },
 * //   { key: "description", path: "description" }
 * // ]
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
 * Recursively extracts keys from an object, splitting them into keys inside the "attributes" field and other keys.
 *
 * This function traverses an object, capturing keys and their full paths. If a key is "attributes", its keys are stored
 * separately in `attributesKeys`, while all other keys are stored in `otherKeys`. Nested objects are processed recursively.
 *
 * @param {object} obj - The object from which keys and their paths are to be extracted.
 * @param {string} [path=""] - The base path used to track the full key path. Defaults to an empty string.
 * @returns {{ attributesKeys: KeyWithPaths; otherKeys: KeyWithPaths }} - An object containing two arrays: one for keys within "attributes"
 * and another for all other keys, each with their associated paths.
 *
 * @example
 * const metadata = {
 *   name: "NFT Name",
 *   attributes: {
 *     trait_type: "Color",
 *     value: "Red"
 *   },
 *   description: "An example NFT"
 * };
 *
 * const result = extractKeysWithPathsSplitAttributes(metadata);
 * console.log(result);
 * // Output:
 * // {
 * //   attributesKeys: [
 * //     { key: "trait_type", path: "attributes.trait_type" },
 * //     { key: "value", path: "attributes.value" }
 * //   ],
 * //   otherKeys: [
 * //     { key: "name", path: "name" },
 * //     { key: "description", path: "description" }
 * //   ]
 * // }
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
 * Counts the occurrences of each key within an array of objects containing keys and their associated paths.
 *
 * This function iterates through an array of key-path pairs and returns a record (object) where each key is associated
 * with the number of times it appears in the input array.
 *
 * @param {KeyWithPaths} keysWithPaths - An array of objects, each containing a key and its associated path.
 * @returns {Record<string, number>} - A record where each key is associated with the number of times it appears.
 *
 * @example
 * const keysWithPaths = [
 *   { key: "name", path: "metadata.name" },
 *   { key: "description", path: "metadata.description" },
 *   { key: "name", path: "metadata.attributes[0].name" }
 * ];
 *
 * const keyCounts = countKeys(keysWithPaths);
 * console.log(keyCounts);
 * // Output:
 * // { name: 2, description: 1 }
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
 * Retrieves paths for keys that exceed a specified occurrence threshold within the metadata.
 *
 * This function filters keys that appear more than the given threshold and returns their associated paths.
 *
 * @param {KeyWithPaths} keysWithPaths - An array of objects, each containing a key and its associated path within the metadata.
 * @param {Record<string, number>} keyCounts - A record of key counts, where the key is the string and the value is the number of occurrences.
 * @param {number} threshold - The maximum allowable number of occurrences for a key. Keys exceeding this threshold will be returned.
 * @returns {Array<{ key: string; path: string }>} - An array of objects, each containing a key and the path(s) where it exceeds the threshold.
 *
 * @example
 * const keysWithPaths = [
 *   { key: "name", path: "metadata.name" },
 *   { key: "name", path: "metadata.attributes[0].name" },
 *   { key: "description", path: "metadata.description" }
 * ];
 * const keyCounts = { name: 2, description: 1 };
 * const threshold = 1;
 *
 * const exceedingPaths = getPathsForExceedingKeys(keysWithPaths, keyCounts, threshold);
 * console.log(exceedingPaths);
 * // Output:
 * // [
 * //   { key: "name", path: "metadata.name" },
 * //   { key: "name", path: "metadata.attributes[0].name" }
 * // ]
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
 * Formats paths and generates Zod issues for keys that appear multiple times in the metadata.
 *
 * This function processes a list of paths associated with metadata keys, checks if any keys appear more than once,
 * and generates Zod issues for each occurrence, including details about the other locations where the key appears.
 *
 * @param {KeyWithPaths} paths - An array of objects containing a key and its associated path within the metadata.
 * @param {Record<string, number>} keyCounts - A record of key counts where the key is the string and the value is the number of occurrences.
 * @returns {ZodIssue[]} - An array of Zod issues, each representing a validation problem with keys that appear multiple times.
 *
 * @example
 * const paths = [
 *   { key: "name", path: "metadata.name" },
 *   { key: "name", path: "metadata.attributes[0].name" }
 * ];
 * const keyCounts = { name: 2 };
 *
 * const issues = formatPaths(paths, keyCounts);
 * console.log(issues);
 * // Output:
 * // [
 * //   {
 * //     code: "custom",
 * //     message: 'Key "name" appear multiple times within the provided metadata.',
 * //     path: ["metadata", "name"],
 * //     params: {
 * //       occurences: 2,
 * //       otherPaths: [["metadata", "attributes", "0", "name"]]
 * //     }
 * //   }
 * // ]
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

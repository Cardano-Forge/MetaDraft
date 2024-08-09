import { KeyWithPaths } from "./types.ts";

/**
 * Recursively extract all keys and keep track of the path
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
 * Count the number of occurence for a key
 */
export const countKeys = (keysWithPaths: KeyWithPaths) =>
  keysWithPaths.reduce(
    (acc, { key }) => ({
      ...acc,
      [key]: (acc[key as keyof typeof acc] || 0) + 1,
    }),
    {},
  );

/**
 * Get an array with path of each keys that are higher than the treshold
 */
export function getPathsForExceedingKeys(
  keysWithPaths: KeyWithPaths,
  keyCounts: Record<string, number>,
  threshold: number,
) {
  // Get the keys that exceed the threshold
  const exceedingKeys = Object.keys(keyCounts).filter(
    (key) => keyCounts[key] && keyCounts[key] > threshold,
  );

  // Find paths for these keys
  const paths = keysWithPaths
    .filter(({ key }) => exceedingKeys.includes(key))
    .map(({ key, path }) => ({ key, path }));

  return paths;
}

/**
 * Format the output to be usable in the frontend
 * Return this output as the warning message
 */
export function formatPaths(
  paths: KeyWithPaths,
  keyCounts: Record<string, number>,
) {
  // Create a map to group paths by key
  const pathsMap: Record<string, string[]> = paths.reduce(
    (acc, { key, path }) => {
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(path);
      return acc;
    },
    {} as Record<string, string[]>,
  );

  // Convert the pathsMap to the desired format
  return Object.keys(pathsMap).map((key) => ({
    field: key,
    paths: pathsMap[key],
    occurences: keyCounts[key] || 0,
  }));
}

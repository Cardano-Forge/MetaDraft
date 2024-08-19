type Path = string[];

/**
 * Recursively searches an object and its nested properties for whitespace.
 * @category Utils
 * @param {object} obj - The object to search.
 * @param {string[]} [path=[]] - An optional array representing the current path within the object. Defaults to an empty array.
 * @return {{ path: string[], whitespaceLocation: 'key' | 'value' }[]} - An array of objects containing the paths and locations ('key' or 'value') where whitespace was found.
 *
 * @example
 * const obj = { a: "   test   ", b: [1, " trim me ", { c: "keep me" }] };
 * console.log(findWhitespace(obj));
 * // Output:
 * [
 *   { path: ['a'], whitespaceLocation: 'value' },
 *   { path: ['b', '[1]'], whitespaceLocation: 'value' }
 * ]
 */
export function findWhitespace(
  obj: object,
  path: Path = [],
): { path: Path; whitespaceLocation: string }[] {
  const results: { path: Path; whitespaceLocation: string }[] = [];

  function search(currentObj: object, currentPath: Path) {
    if (Array.isArray(currentObj)) {
      for (let i = 0; i < currentObj.length; i++) {
        const newPath = [...currentPath, `[${i}]`];

        if (typeof currentObj[i] === "string") {
          const trimmedValue = currentObj[i].trim().length;

          if (trimmedValue < currentObj[i].length) {
            results.push({ path: newPath, whitespaceLocation: "value" });
          }
        } else if (currentObj[i] !== null) {
          // recursively search nested arrays and objects
          search(currentObj[i], newPath);
        }
      }
    } else if (typeof currentObj === "object" && currentObj !== null) {
      for (const [key, value] of Object.entries(currentObj)) {
        const newPath = [...currentPath, key];

        if (key.trim().length < key.length) {
          // check for whitespace in keys
          results.push({ path: newPath, whitespaceLocation: "key" });
        }

        if (typeof value === "string") {
          const trimmedValue = value.trim().length;

          if (trimmedValue < value.length) {
            results.push({ path: newPath, whitespaceLocation: "value" });
          }
        } else if (value !== null) {
          // recursively search nested arrays and objects
          search(value, newPath);
        }
      }
    }
  }

  search(obj, path);

  return results;
}

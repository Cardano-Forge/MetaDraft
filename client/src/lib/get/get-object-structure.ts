import type { Structure } from "../types";

/**
 * Recursively analyzes the structure of an object and returns an object representing
 * the paths to each key and their respective types (e.g., "string", "number", "boolean", "array", or "object").
 *
 * Each key in the resulting structure represents the path to a property in the original object.
 *
 * @param {unknown} obj - The object whose structure is to be analyzed.
 * @param {string} [path=""] - The current path (used internally for recursion). Defaults to an empty string.
 * @returns {Structure} - An object where each key is the path to a property and the value is the type of that property.
 *
 * @example
 * const obj = { name: "Alice", age: 30, active: true, scores: [100, { test: "Math" }] };
 * const structure = getObjectStructure(obj);
 * // structure will be:
 * // {
 * //   "name": "string",
 * //   "age": "number",
 * //   "active": "boolean",
 * //   "scores": "array",
 * //   "scores[0]": "number",
 * //   "scores[1]": "object",
 * //   "scores[1].test": "string"
 * // }
 */
export function getObjectStructure(obj: unknown, path = ""): Structure {
  const structure: Structure = {};

  for (const key in obj as object) {
    if ((obj as object).hasOwnProperty(key)) {
      const value = (obj as Record<string, unknown>)[key];
      const currentPath = path ? `${path}.${key}` : key;

      if (typeof value === "string") {
        structure[currentPath] = "string";
      } else if (typeof value === "number") {
        structure[currentPath] = "number";
      } else if (typeof value === "boolean") {
        structure[currentPath] = "boolean";
      } else if (Array.isArray(value)) {
        structure[currentPath] = "array";
        if (value.length > 0 && typeof value[0] === "object") {
          // Recursively check the structure of the first element in the array
          structure[`${currentPath}[0]`] = getObjectStructure(value[0], "");
        }
      } else if (typeof value === "object" && value !== null) {
        structure[currentPath] = "object";
        Object.assign(structure, getObjectStructure(value, currentPath));
      } else {
        structure[currentPath] = typeof value;
      }
    }
  }

  return structure;
}

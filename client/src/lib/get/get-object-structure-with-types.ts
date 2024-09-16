/**
 * Represents the structure of an object, with each key associated with its type.
 * The value of the type can be "string", "number", "boolean", "array", or a nested object structure.
 */
type Structure = Record<string, unknown>;

/**
 * Recursively analyzes the structure of an object and returns an object with the keys
 * and their respective types (e.g., "string", "number", "boolean", "array", or nested structure).
 *
 * @param {unknown} obj - The object whose structure is to be analyzed.
 * @returns {Structure} - An object representing the structure of the input, with types for each key.
 *
 * @example
 * const obj = { name: "Alice", age: 30, active: true, scores: [100, 90], meta: { role: "admin" } };
 * const structure = getObjectStructureWithTypes(obj);
 * // structure will be:
 * // { name: "string", age: "number", active: "boolean", scores: "array", meta: { role: "string" } }
 */
export function getObjectStructureWithTypes(obj: unknown): Structure {
  const structure: Structure = {};

  for (const key in obj as object) {
    if ((obj as object).hasOwnProperty(key)) {
      const value = (obj as Record<string, unknown>)[key];

      if (typeof value === "string") {
        structure[key] = "string";
      } else if (typeof value === "number") {
        structure[key] = "number";
      } else if (typeof value === "boolean") {
        structure[key] = "boolean";
      } else if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === "object") {
          structure[key] = [getObjectStructureWithTypes(value[0])];
        } else {
          structure[key] = "array";
        }
      } else if (typeof value === "object" && value !== null) {
        structure[key] = getObjectStructureWithTypes(value);
      } else {
        structure[key] = typeof value;
      }
    }
  }

  return structure;
}

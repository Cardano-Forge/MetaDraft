import type { Structure } from "../types";

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

type Structure = Record<string, unknown>;

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

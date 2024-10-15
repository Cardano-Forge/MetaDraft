export function reconcileWithSchema(schema: unknown, obj: unknown): unknown {
  // Initialize the result based on the type of schema (array or object)
  const result: unknown = Array.isArray(schema) ? [] : {};

  // Ensure schema is an object before iterating over its keys
  if (typeof schema === "object" && schema !== null) {
    for (const key in schema as Record<string, unknown>) {
      const schemaValue = (schema as Record<string, unknown>)[key];
      const objValue = (obj as Record<string, unknown>)[key];

      // If the schema is an array, recursively check the first item
      if (Array.isArray(schemaValue)) {
        if (Array.isArray(objValue)) {
          // If the object contains an array, reconcile each element
          (result as Record<string, unknown>)[key] =
            objValue.length > 0
              ? objValue.map((item) =>
                  reconcileWithSchema(schemaValue[0], item),
                )
              : [schemaValue[0]]; // If array is empty, add one default element
        } else {
          // If the object doesn't contain the array, add one default element
          (result as Record<string, unknown>)[key] = [schemaValue[0]];
        }
      } else if (typeof schemaValue === "object" && schemaValue !== null) {
        // Recursively process nested objects
        (result as Record<string, unknown>)[key] = reconcileWithSchema(
          schemaValue,
          objValue || {},
        );
      } else {
        // Copy value from obj if it exists, otherwise use default from schema
        (result as Record<string, unknown>)[key] =
          objValue !== undefined ? objValue : schemaValue;
      }
    }
  }

  return result;
}

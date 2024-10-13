export function reconcileWithSchema(schema: any, obj: any): any {
  // Recursively traverse the schema and match it with the object
  const result: any = Array.isArray(schema) ? [] : {};

  // Loop through schema keys
  for (const key in schema) {
    // If the schema is an array, recursively check the first item
    if (Array.isArray(schema[key])) {
      if (Array.isArray(obj[key])) {
        // If array exists in object, reconcile each element
        result[key] =
          obj[key].length > 0
            ? obj[key].map((item) => reconcileWithSchema(schema[key][0], item))
            : [schema[key][0]]; // If the array is empty, add one default element
      } else {
        // If the object does not contain the array, add one default element
        result[key] = [schema[key][0]];
      }
    } else if (typeof schema[key] === "object" && schema[key] !== null) {
      // Recursively process nested objects
      result[key] = reconcileWithSchema(schema[key], obj[key] || {});
    } else {
      // Copy value from obj if it exists, otherwise use default from schema
      result[key] = obj[key] !== undefined ? obj[key] : schema[key];
    }
  }

  return result;
}

type Path = string[];

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

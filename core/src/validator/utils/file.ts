import { accessSync } from "node:fs";
import { isAbsolute } from "node:path";

export function isValidPath(filePath: string) {
  // Check if the path is absolute
  if (!isAbsolute(filePath)) {
    return false;
  }

  // Check if the path exists and is accessible
  try {
    accessSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

import { accessSync } from "node:fs";
import { isAbsolute } from "node:path";

/**
 * Checks if a given file path is valid, absolute, and accessible.
 *
 * @param {string} filePath - The file path to check.
 * @return {boolean} `true` if the path is valid and accessible; otherwise, `false`.
 */
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

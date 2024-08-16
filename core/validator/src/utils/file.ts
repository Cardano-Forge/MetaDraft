import { accessSync } from "node:fs";
import { isAbsolute } from "node:path";

/**
 * Checks if a given file path is valid, absolute, and accessible.
 *
 * @param {string} filePath - The file path to check. If the path is not absolute,
 *                            it will be treated as invalid.
 *
 * @return {boolean}
 *    `true` if the path is:
 *    - Absolute
 *    - Accessible (i.e., exists and can be accessed)
 *    Otherwise, returns `false`.
 *
 * @throws {Error} Throws an error if the file path is not valid or accessible.
 *
 * @example
 * console.log(isValidPath('/path/to/file.txt')); // true
 * console.log(isValidPath('relative/path/to/file.txt')); // false
 */
export function isValidPath(filePath: string): boolean {
  if (!isAbsolute(filePath)) {
    return false;
  }
  try {
    accessSync(filePath);
    return true;
  } catch {
    return false;
  }
}

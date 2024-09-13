/**
 * Retrieves the file extension from a given filename.
 *
 * @param {string} filename - The name of the file, including the extension.
 * @returns {string} The file extension, or an empty string if no extension is found.
 *
 * @example
 * getFileExtension("image.png"); // "png"
 * getFileExtension("archive.tar.gz"); // "gz"
 * getFileExtension("README"); // ""
 */
export const getFileExtension = (filename: string) => {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() : "";
};

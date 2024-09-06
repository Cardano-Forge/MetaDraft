/**
 * Reads the content of a `File` object as text and parses it as JSON.
 * Returns a promise that resolves to the parsed JSON object or rejects if an error occurs.
 *
 * @param {File | undefined} file - The file to be read. If `undefined`, the function returns a rejected promise.
 * @returns {Promise<object>} A promise that resolves to the parsed JSON object from the file's content.
 *
 * @example
 * readFile(file).then(data => console.log(data)).catch(error => console.error(error));
 */
export const readFile = async (file: File | undefined) => {
  return new Promise<object>((resolve, reject) => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          return resolve(readJSON(e.target?.result?.toString()));
        } catch (err) {
          return reject(err);
        }
      };

      reader.onerror = (err) => {
        return reject(err);
      };

      reader.readAsText(file);
    }
  });
};

/**
 * Parses a string as JSON and returns the resulting object.
 * Returns an empty object if the input is `undefined` or if parsing fails.
 *
 * @param {string | undefined} data - The JSON string to be parsed. If `undefined`, an empty object is returned.
 * @returns {object} The parsed JSON object, or an empty object if parsing fails or data is `undefined`.
 *
 * @example
 * readJSON('{"key": "value"}'); // { key: "value" }
 * readJSON('invalid json'); // {}
 */
export const readJSON = (data: string | undefined): object => {
  if (!data) return {};
  try {
    return JSON.parse(data) as object;
  } catch (e) {
    return {};
  }
};

/**
 * Extracts the name of a file without its extension.
 * If the file is `undefined` or does not have an extension, the function returns the file name as-is or a default name.
 *
 * @param {File | undefined} file - The file from which to extract the name. If `undefined`, returns a default name.
 * @returns {string} The file name without its extension or a default name if the file is `undefined` or has no extension.
 *
 * @example
 * getFileName(file); // "filename" (if file name is "filename.txt")
 * getFileName(undefined); // "Project Name"
 */
export const getFileName = (file: File | undefined) => {
  if (!file) return "Project Name";

  const lastDotIndex = file.name.lastIndexOf(".");
  if (lastDotIndex === -1 || lastDotIndex === 0) {
    return file.name;
  }

  return file.name.slice(0, lastDotIndex);
};

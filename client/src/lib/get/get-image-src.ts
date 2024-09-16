/**
 * Transforms an image source string or array of strings into a usable URL.
 *
 * - If the input is an array, it concatenates the elements into a single string.
 * - If the input is a data URL (`data:image`), it returns the string as-is.
 * - If the input starts with `ipfs://`, it converts it to an `https://ipfs.io/ipfs/` URL.
 *
 * @param {string | string[]} str - The image source as a string or array of strings.
 * @returns {string} The processed image URL.
 */

export function getImageSrc(str: string | string[]) {
  if (Array.isArray(str)) str = str.join("");

  if (str.startsWith("data:image")) return str;

  if (str.startsWith("ipfs://"))
    return str.replace("ipfs://", "https://ipfs.io/ipfs/");
  return str;
}

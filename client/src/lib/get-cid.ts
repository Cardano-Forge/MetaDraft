/**
 * Extracts the CID (Content Identifier) from an IPFS URL by removing the `ipfs://` prefix.
 * If the input is an array of strings, it concatenates the array into a single string before processing.
 *
 * @param {string | string[]} image - The IPFS URL or an array of IPFS URL segments.
 * @returns {string} The CID with the `ipfs://` prefix removed.
 *
 * @example
 * getCID("ipfs://Qm..."); // "Qm..."
 * getCID(["ipfs://Qm", "..."]); // "Qm..."
 */
export const getCID = (image: string | string[]) => {
  if (Array.isArray(image)) return image.join("").replaceAll("ipfs://", "");
  return image.replaceAll("ipfs://", "");
};

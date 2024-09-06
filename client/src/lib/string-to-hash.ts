/**
 * Computes the SHA-256 hash of a given string and returns it as a hexadecimal string.
 *
 * @param {string} str - The input string to be hashed.
 * @returns {Promise<string>} A promise that resolves to the hexadecimal representation of the SHA-256 hash of the input string.
 *
 * @example
 * stringToHash("hello world").then(hash => console.log(hash)); // "b94d27b9934d3e08a52e52d7da7dabf3f9f89f8a7350534e8e3f6e0001d3c6d2"
 */
export const stringToHash = async (str: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
};

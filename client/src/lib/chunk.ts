/**
 * Splits an array into chunks of the specified size.
 *
 * @template T - The type of elements in the array.
 * @param {T[]} array - The array to be split into chunks.
 * @param {number} size - The size of each chunk.
 * @returns {T[][]} A new array containing subarrays (chunks) of the specified size.
 *                  The last chunk may have fewer elements if the array cannot be evenly divided.
 */
export function chunk<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

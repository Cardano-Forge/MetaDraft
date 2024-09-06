/**
 * Formats a number by inserting spaces as thousand separators.
 *
 * @param {number} num - The number to be formatted.
 * @returns {string} The formatted number as a string, with spaces separating each group of thousands.
 *
 * @example
 * formatThousands(1234567); // "1 234 567"
 */
export const formatThousands = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

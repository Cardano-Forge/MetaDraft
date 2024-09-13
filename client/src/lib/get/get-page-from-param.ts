import { bind } from "../bind-number";

/**
 * Retrieves a page number from a parameter, ensuring it is within a specified range.
 * If the parameter is invalid or null, it defaults to page 1. The page number is clamped between 1 and the provided maximum value.
 *
 * @param {string | null} param - The parameter representing the page number. Can be a string or null.
 * @param {number} max - The maximum allowable page number.
 * @returns {number} The valid page number, clamped between 1 and `max`.
 *
 * @example
 * getPageFromParams("5", 10); // 5
 * getPageFromParams("20", 10); // 10
 * getPageFromParams(null, 10); // 1
 * getPageFromParams("abc", 10); // 1
 */
export const getPageFromParams = (param: string | null, max: number) => {
  if (!param) return 1;
  if (isNaN(+param)) return 1;
  return bind(1, max, +param);
};

/**
 * Splits a given string or array of strings into smaller chunks, ensuring each chunk is no longer than 64 characters.
 * @category Formatter
 * @param {string|string[]} str - The input string or array of strings to split.
 * @returns {string|string[]} The formatted result as a single string (if the original length was less than or equal to 64) or an array of strings (if longer).
 */
export function split(str: string | string[]): string | string[] {
  let strToCheck: string;
  if (typeof str === "string") {
    strToCheck = str;
  } else {
    strToCheck = str.join("");
  }
  const splitArray: string[] = [];
  let formatString = "";
  // TRIM
  const string = strToCheck.trim();

  // SKIP IF ALREADY UNDER MAX CHARACTER
  if (string.length <= 64) {
    return string;
  }

  // SPLIT BY WORDS
  const split = string.split(" ");

  // FORMAT {formatString.length} <= 64
  split.forEach((strToCheck) => {
    // FIRST WORD
    if (formatString.length === 0) {
      if (strToCheck.length > 64) {
        const rest = hardCut(strToCheck, splitArray);
        formatString = `${rest} `;
      } else {
        formatString = `${strToCheck} `;
      }
    } else {
      // ADD NEW WORD TO {formatString}
      if (formatString.length + strToCheck.length + 1 <= 64) {
        formatString += `${strToCheck} `;
      } else {
        if (strToCheck.length > 64) {
          const charLeft = 64 - formatString.length;
          const cutStr = strToCheck.substring(0, charLeft);
          formatString += cutStr;
          splitArray.push(formatString);
          const rest = hardCut(strToCheck.substring(64), splitArray);
          formatString = `${rest} `;
        } else {
          splitArray.push(formatString);
          formatString = `${strToCheck} `;
        }
      }
    }
  });

  if (formatString.length > 0) {
    splitArray.push(formatString.trim());
  }

  return splitArray;
}

/**
 * Recursively cuts a given string into chunks of max length 64 characters.
 *
 * @param {string} str - The input string to cut.
 * @param {string[]} arr - The array to store the resulting chunks.
 * @returns {string} The remaining part of the string after cutting.
 */
const hardCut = (str: string, arr: string[]): string => {
  if (str.length <= 64) {
    return str;
  }
  arr.push(str.substring(0, 64));
  return hardCut(str.substring(64), arr);
};

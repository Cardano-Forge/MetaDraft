/**
 * Split {string} in chunks of max 64 characters
 * @param {string} str
 * @returns string array of max 64 characters
 */
export const split = (str: string | string[]) => {
  if (typeof str === "string") {
    const splitArray: string[] = [];
    let formatString = "";
    // TRIM
    const string = str.trim();

    // SKIP IF ALREADY UNDER MAX CHARACTER
    if (string.length <= 64) return [string];

    // SPLIT BY WORDS
    const split = string.split(" ");

    // FORMAT {formatString.length} <= 64
    split.forEach((str) => {
      // FIRST WORD
      if (formatString.length === 0) {
        if (str.length > 64) {
          const rest = hardCut(str, splitArray);
          formatString = `${rest} `;
        } else {
          formatString = `${str} `;
        }
      } else {
        // ADD NEW WORD TO {formatString}
        if (formatString.length + str.length + 1 <= 64) {
          formatString += `${str} `;
        } else {
          if (str.length > 64) {
            const charLeft = 64 - formatString.length;
            const cutStr = str.substring(0, charLeft);
            formatString += cutStr;
            splitArray.push(formatString);
            const rest = hardCut(str.substring(64), splitArray);
            formatString = `${rest} `;
          } else {
            splitArray.push(formatString);
            formatString = `${str} `;
          }
        }
      }
    });

    if (formatString.length > 0) splitArray.push(formatString.trim());

    return splitArray;
  }
  return ["Params was not a string."];
};

const hardCut = (str: string, arr: string[]) => {
  if (str.length <= 64) return str;
  arr.push(str.substring(0, 64));
  return hardCut(str.substring(64), arr);
};

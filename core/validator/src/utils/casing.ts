/**
 * Checks if a given string is in title case (e.g., "Title Case").
 *
 * Each word should start with an uppercase letter, and the rest of the letters in each word should be lowercase.
 *
 * @param {string} str - The input string to check.
 * @return {boolean} Whether the string is in title case.
 */
export function isTitleCase(str: string): boolean {
  return str.split(" ").every((word: string) => {
    return (
      word[0] &&
      word[0] === word[0].toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase()
    );
  });
}

/**
 * Checks if a given string is in camel case (e.g., "camelCase").
 *
 * The first word is lowercase, and subsequent words are capitalized.
 *
 * @param {string} str - The input string to check.
 * @return {boolean} Whether the string is in camel case.
 */
export function isCamelCase(str: string): boolean {
  const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/;
  return camelCasePattern.test(str);
}

/**
 * Checks if a given string is in snake case (e.g., "snake_case").
 *
 * All lowercase letters are separated by underscores.
 *
 * @param {string} str - The input string to check.
 * @return {boolean} Whether the string is in snake case.
 */
export function isSnakeCase(str: string): boolean {
  const snakeCasePattern = /^[a-z]+(_[a-z]+)*$/;
  return snakeCasePattern.test(str);
}

/**
 * Checks if a given string contains only uppercase words (e.g., "UPPER_CASE").
 *
 * @param {string} str - The input string to check.
 * @return {boolean} Whether the string consists of all uppercase words.
 */
export function isUpperCaseWords(str: string): boolean {
  return str.split(" ").every((word) => word === word.toUpperCase());
}

/**
 * Checks if a given string contains only lowercase words (e.g., "lower_case").
 *
 * @param {string} str - The input string to check.
 * @return {boolean} Whether the string consists of all lowercase words.
 */
export function isLowerCaseWords(str: string): boolean {
  return str.split(" ").every((word) => word === word.toLowerCase());
}

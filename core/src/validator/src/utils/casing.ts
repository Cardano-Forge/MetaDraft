/**
 * Each word in the string should start with an uppercase letter, and the rest of the letters in each word should be lowercase
 */
export function isTitleCase(str: string) {
  return str.split(" ").every((word: string) => {
    return (
      word[0] &&
      word[0] === word[0].toUpperCase() &&
      word.slice(1) === word.slice(1).toLowerCase()
    );
  });
}

/**
 * The first word is lowercase, and subsequent words are capitalized
 */
export function isCamelCase(str: string) {
  const camelCasePattern = /^[a-z]+([A-Z][a-z]*)*$/;
  return camelCasePattern.test(str);
}

/**
 * All lowercase letters separated by underscores
 */
export function isSnakeCase(str: string) {
  const snakeCasePattern = /^[a-z]+(_[a-z]+)*$/;
  return snakeCasePattern.test(str);
}

/**
 * All words are fully uppercase
 */
export function isUpperCaseWords(str: string) {
  return str.split(" ").every((word) => word === word.toUpperCase());
}

/**
 * All words are fully lowercase
 */
export function isLowerCaseWords(str: string) {
  return str.split(" ").every((word) => word === word.toLowerCase());
}

/**
 * Converts a hyphen-separated string into a title case format.
 *
 * The first word is capitalized, and the hyphens are replaced with spaces.
 *
 * Example:
 * - "key-camel-case" -> "Key camel case"
 *
 * @param {string} str - The input string in hyphen format (e.g., "key-camel-case").
 * @returns {string} The string converted to title case (e.g., "Key camel case").
 */
export function hyphenToTitleCase(str: string): string {
  return str
    .split("-")
    .map((word, index) => {
      if (index === 0) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      return word;
    })
    .join(" ");
}

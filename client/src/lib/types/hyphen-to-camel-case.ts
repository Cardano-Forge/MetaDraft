/**
 * Converts a hyphenated string to camelCase.
 *
 * Example:
 * ```typescript
 * hyphenToCamelCase('key-anvil-casing'); // 'keyAnvilCasing'
 * ```
 *
 * @param {string} str - The hyphenated string to convert.
 * @returns {string} - The camelCased version of the input string.
 */
export function hyphenToCamelCase(str: string): string {
  return str.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase());
}

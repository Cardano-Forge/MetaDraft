/**
 * Clamps a value between a minimum and maximum bound.
 *
 * @param {number} min - The minimum allowable value.
 * @param {number} max - The maximum allowable value.
 * @param {number} value - The value to be clamped.
 * @returns {number} The clamped value, which will be within the range [min, max].
 *                   If `value` is less than `min`, it returns `min`. If `value` is greater than `max`, it returns `max`.
 *                   Otherwise, it returns the original `value`.
 */
export function bind(min: number, max: number, value: number) {
  if (value < min) {
    return min;
  }
  if (value > max) {
    return max;
  }
  return value;
}

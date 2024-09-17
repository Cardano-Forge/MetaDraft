import type { ValidationsCollection } from "../types";

/**
 * Computes the count of warnings and errors from an array of validation objects.
 *
 * @param {ValidationsCollection[]} validations - An array of validation objects, each containing warnings and errors.
 * @returns {Record<"warnings" | "errors", Record<string, { count: number; message: string }>>} - An object with two properties, `warnings` and `errors`, each containing a record of validator IDs with their respective count and message.
 *
 * @example
 * const validations = [
 *   {
 *     validation: {
 *       status: "failure",
 *       warnings: [{ validatorId: "v1", message: "Warning message" }],
 *       errors: [{ validatorId: "v2", message: "Error message" }]
 *     }
 *   }
 * ];
 *
 * const result = getKeyCount(validations);
 * console.log(result);
 * // Output:
 * // {
 * //   warnings: { v1: { count: 1, message: "Warning message" } },
 * //   errors: { v2: { count: 1, message: "Error message" } }
 * // }
 */
export const getKeyCount = (validations: ValidationsCollection[]) => {
  const keys: Record<
    "warnings" | "errors",
    Record<string, { count: number; message: string }>
  > = {
    warnings: {},
    errors: {},
  };
  if (!validations) return keys;
  validations.forEach(({ validation }) => {
    if (validation.status !== "success") {
      // WARNINGS
      validation.warnings.forEach(({ validatorId, message }) => {
        if (keys.warnings[validatorId]) {
          keys.warnings[validatorId].count++;
        } else {
          keys.warnings[validatorId] = {
            count: 1,
            message: getMessage(message),
          };
        }
      });
      // ERRORS
      validation.errors.forEach(({ validatorId, message }) => {
        if (keys.errors[validatorId]) {
          keys.errors[validatorId].count++;
        } else {
          keys.errors[validatorId] = {
            count: 1,
            message: getMessage(message),
          };
        }
      });
    }
  });
  return keys;
};

type MessageObject = { message: string };

/**
 * Extracts a string message from a given input, which could be a string or an object with a `message` property.
 *
 * @param {unknown} message - The input value which could be a string or an object with a `message` property.
 * @returns {string} - The extracted message. Returns an empty string if no valid message is found.
 */
const getMessage = (message: unknown) => {
  if (!message) return "";
  if (typeof message === "string") return message;
  if ((message as MessageObject).message) return (message as MessageObject).message;
  return "";
};

import type { ZodIssue } from "zod";

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
      validation.warnings.forEach(({ validatorId, validationErrors }) => {
        if (keys.warnings[validatorId]) {
          keys.warnings[validatorId].count++;
        } else {
          keys.warnings[validatorId] = {
            count: 1,
            message: getMessage(validationErrors),
          };
        }
      });
      // ERRORS
      validation.errors.forEach(({ validatorId, validationErrors }) => {
        if (keys.errors[validatorId]) {
          keys.errors[validatorId].count++;
        } else {
          keys.errors[validatorId] = {
            count: 1,
            message: getMessage(validationErrors),
          };
        }
      });
    }
  });
  return keys;
};

/**
 * Extracts the first error message from a ZodError object.
 * If no specific message is found, a default message is returned.
 *
 * @param {ZodIssue[]} error - The ZodError object containing validation issues.
 * @returns {string} - The first error message, or a default message if none exists.
 *
 */
const getMessage = (error: ZodIssue[]): string => {
  return error[0]?.message ?? "There is an unknown warning or error";
};

import type { StateOutput } from "../mod.ts";
import type { StateError, ZodSafeParse } from "./types.ts";

/**
 * Processes the validation result and returns a structured output for state status, warnings, and errors.
 *
 * This function evaluates whether the result contains an error and assigns a status of either "success", "warning",
 * or "error" based on the presence of issues. It then formats the output to include warnings or errors accordingly.
 *
 * @param {StateError | ZodSafeParse} result - The validation result object which can either be a `StateError` or a parsed Zod result.
 * @param {string} _assetName - The name of the asset being validated (currently unused in the logic).
 * @param {string} [validatorId="UNKNOWN"] - An identifier for the validator that produced the result. Defaults to "UNKNOWN".
 * @returns {StateOutput} - An object containing the validation status, warnings, and errors.
 *
 * @example
 * const validationOutput = GetValidationOutput(parsedResult, "assetName", "validator-123");
 * console.log(validationOutput);
 * // Output:
 * // {
 * //   status: "warning",
 * //   warnings: [{ validatorId: "validator-123", validationError: ZodError }],
 * //   errors: []
 * // }
 */
export function GetValidationOutput(
  result: StateError | ZodSafeParse,
  _assetName: string,
  validatorId: string = "UNKNOWN"
): StateOutput {
  const { error } = result;

  // If no error or no issues, the status is "success"
  if (!error || error.issues.length === 0) {
    return { status: "success", warnings: [], errors: [] };
  }

  // Determine state: default to "warning" if undefined
  const state = (result as StateError).state ?? "warning";

  // Prepare warnings and errors based on the state
  const warnings =
    state === "warning" ? [{ validatorId, validationErrors: error.issues }] : [];
  const errors =
    state === "error" ? [{ validatorId, validationErrors: error.issues }] : [];

  return { status: state, warnings, errors };
}

import type { StateOutput } from "../mod.ts";
import type { StateError, ZodSafeParse } from "./types.ts";

/**
 * Generates validation output based on the given result and other parameters.
 *
 * @param {unknown} result - The validation result object. Expected to have the following shape:
 *   - error?: ZodError (if validation failed)
 *   - success?: boolean (indicating successful validation)
 *   - state?: 'success' | 'error' (if validation result is StateError)
 *   - message?: string (if validation result is StateError)
 * @param {string} successMessage - The message to display upon successful validation.
 * @param {string} [_assetName] - The name of the asset being validated. Defaults to "UNKNOWN". Kept to keep the same structure that we had
 * @param {unknown} [_metadata] - Any additional metadata related to the validation process. Kept to keep the same structure that we had
 * @param {string} [validatorId="UNKNOWN"] - The ID of the validator performing the check. Defaults to "UNKNOWN".
 * @returns {StateOutput}
 *   - An object containing the validation status and warning messages.
 */
export function GetValidationOutput(
  result: StateError | ZodSafeParse,
  _assetName: string,
  validatorId: string = "UNKNOWN"
): StateOutput {
  // Success
  if (!result.error || result.error.issues.length === 0)
    return { status: "success", warnings: [], errors: [] };

  // Has warning || has error
  const state = (result as StateError).state ?? "warning";

  return {
    status: state,
    warnings:
      state === "warning"
        ? [{ validatorId, validationError: result.error }]
        : [],
    errors:
      state === "error" ? [{ validatorId, validationError: result.error }] : [],
  };
}

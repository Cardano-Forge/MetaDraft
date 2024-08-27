import type { StateOutput } from "../mod.ts";
import { formatError } from "./formatError.ts";
import type {
  FormattedError,
  State,
  StateError,
  ZodStateError,
} from "./types.ts";

/**
 * Evaluates the formatted errors to determine their severity.
 * If all detected issues are warnings, the state is set to "warning".
 * If at least one error is detected, the state is set to "error".
 * Otherwise, it returns "success".
 * @category Utils
 * @param {FormattedError | undefined} error - Error formatted using zod, or undefined (in case of undefined, it means "success").
 *
 * @returns {State} The state, which can be "success", "warning", or "error".
 */
function getState(error: FormattedError | undefined = undefined): State {
  let condition: State = "error";

  // It is a success
  if (!error) {
    return "success";
  }

  // there is a potential error (maybe a warning)
  if (error) {
    // Extract all errors from fieldErrors
    const allErrors = Object.values(error.fieldErrors).flat();

    // Check if all errors have a status of "warning"
    const allWarnings = allErrors.every((err) => err.status === "warning");

    // Update condition based on the check
    condition = allWarnings ? "warning" : condition;
  }

  return condition;
}

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
  result: unknown,
  successMessage: string,
  _assetName: string,
  _metadata: unknown,
  validatorId: string = "UNKNOWN",
): StateOutput {
  const isSuccess =
    (result as ZodStateError).success ||
    (result as StateError).state === "success";

  const state = (result as StateError).state
    ? (result as StateError).state
    : getState(formatError((result as ZodStateError).error));

  const message = isSuccess
    ? successMessage
    : (result as ZodStateError).error
      ? formatError((result as ZodStateError).error)
      : (result as StateError).message;

  return {
    status: state,
    warnings: [{ validatorId: validatorId, message }],
  };
}

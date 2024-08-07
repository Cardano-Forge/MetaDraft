import { formatError } from "./formatError.ts";
import type { FormattedError, Result, State } from "./types.ts";

/**
 * Evaluates the formatted errors to determine their severity.
 * If all detected issues are warnings, the state is set to "warning".
 * If at least one error is detected, the state is set to "error".
 * Otherwise, it returns "success".
 *
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
 * Returns a formatted object the errors, warning and/or success
 * the state represent a success, warning or error
 * the message is a string when it is a success, and an object containing the details for warning and error
 * the input and output are used to allow the developer to apply custom UI/UX component
 * the asset_name is required, it acts as an ID to know what input to update (such as a HTML id)
 */
/**
 * Formats and returns an array of result objects containing state, message, input, and output details for success, warning, or error conditions.
 *
 * @param {any} result - The zod result object to be processed.
 * @param {string} success_message - The message to display when the state is "success".
 * @param {string} asset_name - The required identifier for the asset, used to determine which input to update (e.g., an HTML id).
 * @param {unknown} metadata - The current asset metadata
 *
 * @returns {Result[]} An array of formatted result objects with the following structure:
 *   - `asset_name` (string): The identifier for the asset.
 *   - `state` (string): The state ("success", "warning", or "error").
 *   - `message` (string|Object): The message to display, an object in case of warning or error.
 *   - `input` (Object|undefined): Custom input for custom UI/UX components.
 *   - `output` (Object|undefined): Custom output for custom UI/UX components.
 */
export function getStates(
  result: any,
  success_message: string,
  asset_name: string,
  metadata: unknown,
  validator_id: string = "UNKNOWN",
): Result[] {
  return [
    {
      state: getState(formatError(result.error)),
      message: result.success
        ? success_message
        : (formatError(result.error) as FormattedError),
      input: metadata,
      output: result.data,
      asset_name,
      validator_id,
    },
  ];
}

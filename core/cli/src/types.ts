/**
 * A union type representing validation states: success, warning, or error.
 */
export type State = "success" | "warning" | "error";

/**
 * Type representing a validation result containing state, message, input, output (optional), assetName, and validatorId.
 */
export interface Result {
  /**
   * The current validation state.
   */
  state: State;

  /**
   * An optional message or object associated with the validation result. Defaults to `undefined`.
   */
  message: string | object | undefined;

  /**
   * The input data that was validated.
   */
  input: unknown;

  /**
   * The output data resulting from successful validation (optional). Set to `undefined` when there is an error/warning.
   */
  output: unknown | undefined;

  /**
   * The name of the asset being validated.
   */
  assetName: string;

  /**
   * The identifier for the validator used in this result.
   */
  validatorId: string;
}

/**
 * Type representing a record containing data keyed by string.
 */
export type DataRead = Record<string, unknown>;

/**
 * As of 2024-09-03 - the Metadata structure should look like this one.
 */
export type Metadata = { assetName: string; metadata: object };

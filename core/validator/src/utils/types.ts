/**
 * Type representing a formatted error object containing message, errorCode, status, and path.
 */
export interface FormatError {
  /**
   * The error message.
   */
  message: string;

  /**
   * The error code associated with the issue.
   */
  errorCode: string;

  /**
   * The current validation state (e.g., success, warning, error). Defaults to `undefined`.
   */
  status?: string | undefined;

  /**
   * The path within the data structure where the error occurred.
   */
  path: string;
}

/**
 * Type representing an object containing form and field errors.
 */
export interface FormattedError {
  /**
   * An empty array for form errors (currently not used).
   */
  formErrors: [];

  /**
   * A record containing field-specific errors keyed by the field name.
   */
  fieldErrors: Record<string, Array<FormatError>>;
}

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
  message?: string | object | undefined;

  /**
   * The input data that was validated.
   */
  input: unknown;

  /**
   * The output data resulting from successful validation (optional). Set to `undefined` when there is an error/warning.
   */
  output?: unknown | undefined;

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
 * Interface representing a validator with a unique `id` (tracker) and an `Execute` method that returns validation results.
 */
export interface IValidator {
  /**
   * A unique identifier for the validator (used as a tracker).
   */
  id: string;

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {unknown} _metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {Result[]} An array of validation results.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Result[];
}

/**
 * Type representing a key with its corresponding path within the data structure.
 */
export type KeyWithPath = {
  /**
   * The key name.
   */
  key: string;

  /**
   * The path where the key is located in the data structure.
   */
  path: string;
};

/**
 * Type representing an array of keys with their corresponding paths.
 */
export type KeyWithPaths = KeyWithPath[];

/**
 * Type representing a record containing data keyed by string.
 */
export type DataRead = Record<string, unknown>;

/**
 * Interface representing a data reader capable of loading and reading data based on the provided path or data object.
 */
export interface IReader {
  /**
   * The current data being read by the reader.
   */
  data: any;

  /**
   * Loads data asynchronously from the given path or returns it synchronously if already available.
   *
   * @param {string} pathOrData - Either a file path to load or an existing data object.
   * @returns {Promise<any> | any} The loaded data.
   */
  Load(pathOrData: string): Promise<any> | any;

  /**
   * Reads and returns either an array of data records asynchronously or synchronously if already available.
   *
   * @returns {Promise<DataRead[]> | DataRead[]} An array of data records.
   */
  Read(): Promise<DataRead[]> | DataRead[];
}

/**
 * Type representing options for CSV processing, such as delimiter, valueByType, subArray, and quotedField settings.
 */
export type CsvOptions = {
  /**
   * The character used to delimit fields in the CSV file.
   */
  delimiter: string;

  /**
   * Whether to infer data types based on values when reading CSV files.
   */
  valueByType: boolean;

  /**
   * An array containing two strings representing the start and end characters for sub-arrays in CSV files.
   */
  subArray: [string, string];

  /**
   * Whether fields with spaces should be quoted in the output CSV file.
   */
  quotedField: boolean;
};

/**
 * Type representing an object containing Zod error information along with success status and data.
 */
export type ZodStateError = {
  /**
   * The error encountered during validation using Zod.
   */
  error: ZodError;

  /**
   * A boolean indicating whether the validation was successful (false when there's an error).
   */
  success: boolean;

  /**
   * The data associated with the validation attempt.
   */
  data: Object;
};

/**
 * Type representing a general state error object containing state, message, and data.
 */
export type StateError = {
  /**
   * The current validation state (e.g., success, warning, error).
   */
  state: State;

  /**
   * An optional error message associated with the state.
   */
  message?: string | undefined;

  /**
   * The data associated with the validation attempt.
   */
  data: Object;
};

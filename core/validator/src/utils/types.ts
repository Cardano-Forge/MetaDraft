import type { ZodError, ZodIssue } from "zod";

/**
 * A union type representing validation states: success, warning, or error.
 */
export type State = "success" | "warning" | "error";

/**
 * Interface representing a validator with a unique `id` (tracker) and an `Execute` method that returns validation results.
 */
export interface IValidator {
  /**
   * A unique identifier for the validator (used as a tracker).
   */
  id: string;
  /**
   * A type of validator to run per asset or once per validation.
   */
  type: "once" | "all";

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {unknown} _metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {StateOutput} An object of validation results.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput;

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @param {Record<string, StateOutput>} _validations An object of validation results.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  ExecuteOnce(
    _metadatas: unknown[],
    _validations: Record<string, StateOutput>
  ): Record<string, StateOutput>;
}

/**
 * Interface representing a validator with a unique `id` (tracker) and an `Execute` method that returns validation results.
 */
export interface IMainValidator {
  /**
   * A unique identifier for the validator (used as a tracker).
   */
  id: string;
  /**
   * A type of validator to run per asset or once per validation.
   */
  type: "once" | "all";

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {unknown} _metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[]
  ): Record<string, StateOutput>;

  /**
   * Executes the validation logic with provided asset name, metadata, and metadatas.
   *
   * @param {unknown[]} _metadatas - An array of additional metadata objects.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  ExecuteOnce(_metadatas: unknown[]): Record<string, StateOutput>;
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
  data: DataRead[] | null;

  /**
   * Loads data asynchronously from the given path or returns it synchronously if already available.
   *
   * @param {string} pathOrData - Either a file path to load or an existing data object.
   * @returns {Promise<object> | object} The loaded data.
   */
  Load(pathOrData: string): Promise<object> | object;

  /**
   * Reads and returns either an array of data records asynchronously or synchronously if already available.
   *
   * @returns {DataRead[] | null} An array of data records.
   */
  Read(): DataRead[] | null;
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
  data: object;
};

/**
 * Represents the state and an optional Zod validation error.
 *
 * @typedef {Object} StateError
 * @property {State} state - The current state object.
 * @property {ZodError} [error] - An optional error object from Zod validation. If no error occurred, this will be undefined.
 *
 */
export type StateError = {
  state: State;
  error?: ZodError;
};

/**
 * Represents an options object that includes a threshold value.
 *
 * This type is typically used in scenarios where a threshold value is required
 * to configure or limit certain operations, such as filtering or validation checks.
 *
 * @typedef {Object} OptionsWithThreshold
 * @property {number} threshold - A numeric value representing the threshold limit.
 *                                It could be used to define a maximum or minimum value
 *                                for a specific operation.
 *
 * @example
 * // Example usage of OptionsWithThreshold:
 * const options: OptionsWithThreshold = { threshold: 10 };
 */
export type OptionsWithThreshold = {
  threshold: number;
};

/**
 * Type representing the result of a Zod schema's `safeParse()` method.
 *
 * @template T - The expected type of the successfully parsed data.
 *
 * @property {boolean} success - Indicates whether the parsing was successful.
 * @property {ZodError} [error] - The validation error if `success` is `false`.
 */
export type ZodSafeParse = {
  success: boolean;
  error?: ZodError;
};

/**
 * Represents the output state, containing status, warnings, and errors.
 */
export type StateOutput = {
  /**
   * The current state of the validation process.
   */
  status: State;

  /**
   * An array of warnings encountered during validation.
   * Each warning contains a unique validator ID and associated validation error details.
   *
   * @property {string} validatorId - The unique ID of the validator that triggered the warning.
   * @property {Array<ZodIssue>} validationErrors - Detailed information about the validation warning.
   */
  warnings: Array<{
    validatorId: string;
    validationErrors: Array<ZodIssue>;
  }>;

  /**
   * An array of errors encountered during validation.
   * Each error contains a unique validator ID and associated validation error details.
   *
   * @property {string} validatorId - The unique ID of the validator that triggered the error.
   * @property {Array<ZodIssue>} validationErrors - Detailed information about the validation error.
   */
  errors: Array<{
    validatorId: string;
    validationErrors: Array<ZodIssue>;
  }>;
};

/**
 * Represents an optional file object, which includes properties such as
 * the file source, media type, and file name.
 *
 * This type is flexible and allows additional unknown properties.
 *
 * @typedef {Object} OptionalFile
 * @property {string} [src] - The source URL or path of the file (optional).
 * @property {string} [mediaType] - The media type of the file (e.g., "image/png", "application/pdf") (optional).
 * @property {string} [name] - The name of the file (optional).
 * @property {unknown} [key] - Any other additional properties.
 *
 * @example
 * const file: OptionalFile = {
 *   src: "http://example.com/image.png",
 *   mediaType: "image/png",
 *   name: "Example Image",
 * };
 */
export type OptionalFile = {
  src?: string;
  mediaType?: string;
  name?: string;
  [key: string]: unknown;
};

/**
 * Represents the metadata for a CIP-25 asset, including required fields like `name` and `image`,
 * as well as optional fields such as `description`, `mediaType`, and `files`.
 *
 * This type is flexible and allows additional unknown properties.
 *
 * @typedef {Object} MetadataCIP25
 * @property {string} name - The name of the asset.
 * @property {string|string[]} image - The image or an array of images associated with the asset.
 * @property {string|string[]} [description] - The description of the asset (optional).
 * @property {string} [mediaType] - The media type of the asset (optional).
 * @property {OptionalFile[]} [files] - An array of optional files related to the asset (optional).
 * @property {unknown} [key] - Any other additional properties.
 *
 * @example
 * const metadata: MetadataCIP25 = {
 *   name: "NFT #123",
 *   image: "http://example.com/nft-image.png",
 *   description: "This is a description of the NFT.",
 *   mediaType: "image/png",
 *   files: [{ src: "http://example.com/file.pdf", mediaType: "application/pdf", name: "Document" }]
 * };
 */
export type MetadataCIP25 = {
  name: string;
  image: string | string[];
  description?: string | string[];
  mediaType?: string;
  files?: OptionalFile[];
  [key: string]: unknown;
};

/**
 * Represents a simplified metadata structure for an asset, which includes
 * the asset's name and detailed metadata information based on the CIP-25 standard.
 *
 * @typedef {Object} Metadata
 * @property {string} assetName - The unique name of the asset.
 * @property {MetadataCIP25} metadata - The detailed metadata object containing
 *                                        information such as name, image, description,
 *                                        media type, and files.
 */
export type Metadata = {
  assetName: string;
  metadata: MetadataCIP25;
};

/**
 * A union type representing validation states: success, warning, or error.
 */
export type State = "success" | "warning" | "error";

/**
 * Type representing a record containing data keyed by string.
 */
export type DataRead = Record<string, unknown>;

/**
 * As of 2024-09-03 - the Metadata structure should look like this one.
 */
export type Metadata = { assetName: string; metadata: object };

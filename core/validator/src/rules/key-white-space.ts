import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { StateOutput } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { findWhitespace } from "../utils/whiteSpace.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata keys have no trailing whitespace characters.
 *
 * @class KeyWhiteSpace
 * @module Rules
 * @extends BaseValidator
 */
export class KeyWhiteSpace extends BaseValidator {
  /**
   * Creates an instance of KeyWhiteSpace validator.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-white-space";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should have no trailing whitespace characters.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} An array of validation results indicating whether the metadata keys have trailing whitespace characters.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * Validates that metadata keys have no trailing whitespace characters.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} Validation results indicating whether the metadata keys have trailing whitespace characters.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: { path: string[]; whitespaceLocation: string }[] =
      findWhitespace(metadata as object);

    return GetValidationOutput(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Trailing whitespaces found in the JSON object.",
          warnings,
        },
      },
      "All checks passed. No issues detected.",
      assetName,
      metadata,
      this.id,
    );
  }
}

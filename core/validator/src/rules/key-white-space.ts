import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { StateOutput, ZodSafeParse } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { findWhitespace } from "../utils/whiteSpace.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

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
  override Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
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
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    findWhitespace(metadata as object).forEach((res) => {
      warnings.addIssue({
        code: "custom",
        message:
          "Trailing whitespaces detected before or after the JSON object.",
        path: res.path,
        params: {
          whitespaceLocation: res.whitespaceLocation,
        },
      });
    });

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput, ZodSafeParse } from "../utils/types.ts";

import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * Validates that metadata keys do not exceed 64 characters in length.
 *
 * @class KeyLength
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyLength extends BaseValidator {
  /**
   * Creates an instance of KeyLength.
   *
   * @param options - Optional configuration for the validator.
   */
  constructor(options?: object) {
    const id = "key-length";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should not exceed 64 characters in length.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyLength class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should not exceed 64 characters in length.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {StateOutput} An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (key.key.length > 64) {
        warnings.addIssue({
          code: "custom",
          message: "The key length exceeds 64 characters.",
          path: key.path.split("."),
        });
      }
    });

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

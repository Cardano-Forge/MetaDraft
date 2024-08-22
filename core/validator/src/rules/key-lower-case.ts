import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { KeyWithPath, Result } from "../utils/types.ts";
import { isLowerCaseWords } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata keys follow Lower Case formatting (all lowercase, words separated by spaces).
 *
 * @class KeyLowerCase
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyLowerCase extends BaseValidator {
  /**
   * Creates an instance of KeyLowerCase.
   *
   * @param options - Optional configuration for the validator.
   */
  constructor(options?: object) {
    const id = "key-lower-case";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should follow Lower Case formatting.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {Result[]} An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyLowerCase class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should follow Lower Case formatting.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!isLowerCaseWords(key.key)) {
        warnings.push(key);
      }
    });

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Lower Case formatting.",
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

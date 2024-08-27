import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput } from "../utils/types.ts";
import { isTitleCase } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata keys adhere to Title Case formatting. Warns when keys do not follow this casing convention.
 *
 * @class KeyTitleCase
 * @module Rules
 * @extends BaseValidator
 */
export class KeyTitleCase extends BaseValidator {
  /**
   * Creates an instance of KeyTitleCase.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-title-case";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should adhere to Title Case formatting.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} An array of validation results, including warnings for non-Title Case keys.
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
   * The core validation logic for the KeyTitleCase class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should adhere to Title Case formatting.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {StateOutput} An array of validation results, including warnings for non-Title Case keys.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!isTitleCase(key.key)) {
        warnings.push(key);
      }
    });

    return GetValidationOutput(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Title Case formatting.",
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

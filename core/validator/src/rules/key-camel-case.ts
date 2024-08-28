import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput } from "../utils/types.ts";
import { isCamelCase } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";

/**
 * Enforces Camel Case formatting for metadata keys.
 *
 * @class KeyCamelCase
 * @module Rules
 * @extends BaseValidator
 */
export class KeyCamelCase extends BaseValidator {
  /**
   * Constructor for KeyCamelCase validator.
   *
   * @param {object} [options] - Optional configuration options.
   */
  constructor(options?: object) {
    const id = "key-camel-case";
    super(id, options);
  }

  /**
   * Executes the validation logic and returns a Result array.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata object to validate.
   * @param {unknown[]} _metadatas - The list of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
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
   * The core logic of the KeyCamelCase validator.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata object to validate.
   * @param {unknown[]} _metadatas - The list of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
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
      if (!isCamelCase(key.key)) {
        warnings.push(key);
      }
    });

    return GetValidationOutput(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Camel Case formatting.",
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

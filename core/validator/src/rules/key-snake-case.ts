import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { StateOutput, ZodSafeParse } from "../utils/types.ts";
import { isSnakeCase } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * Validates that metadata keys adhere to Snake Case formatting. Warns when keys do not follow this casing convention.
 *
 * @class KeySnakeCase
 * @module Rules
 * @extends BaseValidator
 */
export class KeySnakeCase extends BaseValidator {
  /**
   * Creates an instance of KeySnakeCase.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-snake-case";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should adhere to Snake Case formatting.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} An array of validation results, including warnings for non-Snake Case keys.
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
   * The core validation logic for the KeySnakeCase class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should adhere to Snake Case formatting.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {StateOutput} An array of validation results, including warnings for non-Snake Case keys.
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
      if (!isSnakeCase(key.key)) {
        warnings.addIssue({
          code: "custom",
          message: "Some keys do not adhere to Snake Case formatting.",
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

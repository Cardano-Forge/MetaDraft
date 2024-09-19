import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput, ZodSafeParse } from "../utils/types.ts";
import { isUpperCaseWords } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * Ensures metadata keys follow Upper Case words format.
 *
 * @class KeyUpperCase
 * @module Rules
 * @extends BaseValidator
 */
export class KeyUpperCase extends BaseValidator {
  /**
   * Creates an instance of KeyUpperCase validator.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-upper-case";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Keys should follow Upper Case words format.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} An array of validation results indicating whether the metadata keys adhere to Upper Case formatting.
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
   * Validates that metadata keys follow Upper Case words format.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {StateOutput} Validation results indicating whether the metadata keys adhere to Upper Case formatting.
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
      if (!isUpperCaseWords(key.key)) {
        warnings.addIssue({
          code: "custom",
          message: "Some keys do not adhere to Upper Case formatting.",
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

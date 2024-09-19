import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput, ZodSafeParse } from "../utils/types.ts";

import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * Enforces that metadata keys are alphanumeric, allowing dashes and underscores.
 *
 * @class KeyAlphanumeric
 * @module Rules
 * @extends BaseValidator
 */
export class KeyAlphanumeric extends BaseValidator {
  /**
   * Creates an instance of KeyAlphanumeric validator.
   *
   * @param {object} [options] - The options for the validator.
   */
  constructor(options?: object) {
    const id = "key-alphanumeric";
    super(id, options);
  }

  /**
   * Executes the validation logic for alphanumeric metadata keys.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
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
   * The main validation logic for ensuring metadata keys are alphanumeric.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const alphanumeric = /^[a-zA-Z0-9-_]+$/;
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!alphanumeric.test(key.key)) {
        warnings.addIssue({
          code: "custom",
          message:
            "Only alphanumeric characters, dashes, and underscores are allowed for the key.",
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

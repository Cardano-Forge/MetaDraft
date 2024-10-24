import { ZodError } from "zod";
import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import {
  countKeys,
  extractKeysWithPaths,
  formatPaths,
  getPathsForExceedingKeys,
} from "../utils/keys.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type {
  OptionsWithThreshold,
  StateOutput,
  ZodSafeParse,
} from "../utils/types.ts";

/**
 * A validator that checks metadata for duplicate keys exceeding a specified threshold.
 *
 * @class DuplicateKeys
 * @module Rules
 * @extends BaseValidator
 */
export class DuplicateKeys extends BaseValidator {
  /**
   * Creates an instance of DuplicateKeys.
   *
   * @param {object} [options] - The options for the validator.
   * @param {number} [options.threshold=3] - The threshold number of occurrences before considering a key duplicated.
   */
  constructor(options?: OptionsWithThreshold) {
    const id = "duplicate-keys";
    super(id, { threshold: 3, ...options });
  }

  /**
   * Executes the validation logic for metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
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
   * The main validation logic for checking duplicate keys in metadata.
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
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const keys = extractKeysWithPaths(metadata as object);
    const keyCounts = countKeys(keys);
    const paths = getPathsForExceedingKeys(
      keys,
      keyCounts,
      (this.options as OptionsWithThreshold).threshold
    );

    if (paths.length > 0) {
      warnings.addIssues(formatPaths(paths, keyCounts) || []);
    }

    const hasWarning = warnings.issues.length > 0;
    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

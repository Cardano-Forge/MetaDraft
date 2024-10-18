import { ZodError } from "zod";
import { BaseValidator } from "../core.ts";
import type { ZodSafeParse } from "../mod.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { OptionsWithThreshold, StateOutput } from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if root keys in metadata are too similar to each other based on a Levenshtein distance threshold.
 *
 * This validator uses the `fastest-levenshtein` library under the hood to calculate the Levenshtein distance between keys. It considers two keys as similar if their distance is less than or equal to the provided threshold.
 *
 * @class CompareRootKeys
 * @module Rules
 * @extends BaseValidator
 */
export class CompareRootKeys extends BaseValidator {
  /**
   * Constructs a new instance of the `CompareRootKeys` validator.
   *
   * @param {object} [options] - The options for the validator.
   * @param {number} [options.threshold=2] - The Levenshtein distance threshold below which keys are considered similar.
   */
  constructor(options?: OptionsWithThreshold) {
    const id = "compare-root-keys";
    super(id, { threshold: 2, ...options });
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
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
   * The main logic of the validator that checks for similar root keys in the provided metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {StateOutput} An array containing the validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const keys = Object.keys(metadata as object);

    for (const key of keys) {
      const closestKey = closest(
        key,
        keys.filter((fKey) => fKey !== key)
      );

      const distanceValue = distance(key, closestKey);

      if (distanceValue < (this.options as OptionsWithThreshold).threshold) {
        warnings.addIssue({
          code: "custom",
          message: `${key} is similar to ${closestKey}`,
          path: [key],
        });
      }
    }

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { OptionsWithThreshold, Result } from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if root value strings in metadata are too similar to each other based on a Levenshtein distance threshold.
 *
 * This validator filters out non-string values and calculates the Levenshtein distance between the remaining string values. It considers two values as similar if their distance is less than or equal to the provided threshold.
 *
 * @class CompareRootValues
 * @module Rules
 * @extends BaseValidator
 */
export class CompareRootValues extends BaseValidator {
  /**
   * Constructs a new instance of the `CompareRootValues` validator.
   *
   * @param {object} [options] - The options for the validator.
   * @param {number} [options.threshold=2] - The Levenshtein distance threshold below which values are considered similar.
   */
  constructor(options?: OptionsWithThreshold) {
    const id = "compare-root-values";
    super(id, { threshold: 2, ...options });
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {Result[]} An array containing the validation results.
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
   * The main logic of the validator that checks for similar root value strings in the provided metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {unknown[]} _metadatas - An array of all metadatas (not used in this validator).
   * @returns {Result[]} An array containing the validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: string[] = [];

    let similarValuesDetected = false;

    const values = Object.values(metadata as object);

    const stringValues = values.filter(
      (valueToCheck) => typeof valueToCheck === "string",
    );

    for (const value of stringValues) {
      const closestValue = closest(
        value,
        stringValues.filter((valueToCheck) => valueToCheck !== value),
      );

      const distanceValue = distance(value, closestValue);

      if (distanceValue < (this.options as OptionsWithThreshold).threshold) {
        warnings.push(`${value} is similar to ${closestValue}`);
      }
    }

    if (warnings.length > 0) {
      similarValuesDetected = true;
    }

    return getStates(
      {
        state: similarValuesDetected ? "warning" : "success",
        message: warnings,
      },
      "No similar values found.",
      assetName,
      metadata,
      this.id,
    );
  }
}

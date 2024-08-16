import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

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
  constructor(options?: { treshold: number }) {
    const id = "compare-root-keys";
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
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The main logic of the validator that checks for similar root keys in the provided metadata.
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

    let similarKeysDetected = false;

    const keys = Object.keys(metadata as object);

    for (const key of keys) {
      const closestKey = closest(
        key,
        keys.filter((fKey) => fKey !== key),
      );

      const distanceValue = distance(key, closestKey);

      if (distanceValue < this.options.threshold) {
        warnings.push(`${key} is similar to ${closestKey}`);
      }
    }

    if (warnings.length > 0) {
      similarKeysDetected = true;
    }

    return getStates(
      {
        state: similarKeysDetected ? "warning" : "success",
        message: warnings,
      },
      "No similar keys found.",
      assetName,
      metadata,
      this.id,
    );
  }
}

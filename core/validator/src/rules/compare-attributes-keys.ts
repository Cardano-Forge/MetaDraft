import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if attribute keys in metadata are too similar to each other based on a Levenshtein distance threshold.
 *
 * @class CompareAttributesKeys
 * @module Rules
 * @extends BaseValidator
 */
export class CompareAttributesKeys extends BaseValidator {
  /**
   * Creates a new instance of CompareAttributesKeys.
   *
   * @param options - Optional configuration options for the validator, containing an optional `treshold` value for Levenshtein distance (default is 2).
   */
  constructor(options?: { treshold: number }) {
    const id = "compare-attributes-keys";
    super(id, { threshold: 2, ...options });
  }

  /**
   * Executes the validator logic with the given asset name and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
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
   * The core validation logic that checks for similar attribute keys in the metadata based on Levenshtein distance.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: string[] = [];

    let similarKeysDetected = false;

    const keys = Object.keys(
      (metadata as { attributes: Record<string, unknown> }).attributes,
    );

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

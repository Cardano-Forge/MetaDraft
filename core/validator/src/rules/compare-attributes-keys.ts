import { ZodError } from "zod";
import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { logger } from "../utils/logger.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type {
  OptionsWithThreshold,
  StateOutput,
  ZodSafeParse,
} from "../utils/types.ts";

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
   * @param {object} options - Optional configuration options for the validator, containing an optional `treshold` value for Levenshtein distance (default is 2).
   * @param {number} [options.threshold=2]
   */
  constructor(options?: OptionsWithThreshold) {
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
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
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
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    let keys: string[];
    try {
      keys = Object.keys(
        (metadata as { attributes: Record<string, unknown> }).attributes
      );

      for (const key of keys) {
        const closestKey = closest(
          key,
          keys.filter((fKey) => fKey !== key)
        );

        if (closestKey) {
          const distanceValue = distance(key, closestKey);
          if (
            distanceValue < (this.options as OptionsWithThreshold).threshold
          ) {
            warnings.addIssue({
              code: "custom",
              message: `${key} is similar to ${closestKey}`,
              path: [key],
            });
          }
        }
      }
    } catch {
      warnings.addIssue({
        code: "custom",
        message:
          "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set.",
        path: [],
      });
    }

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

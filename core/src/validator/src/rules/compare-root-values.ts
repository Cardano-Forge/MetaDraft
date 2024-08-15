import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if root value strings in metadata are too similar to each other based on a Levenshtein distance threshold.
 */
export class CompareRootValues extends BaseValidator {
  constructor(options?: { treshold: number }) {
    const id = "compare-root-values";
    super(id, { threshold: 2, ...options });
  }

  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

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

      if (distanceValue < this.options.threshold) {
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

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

import { distance, closest } from "fastest_levenshtein";

/**
 * A validator that checks if attribute keys in metadata are too similar to each other based on a Levenshtein distance threshold.
 */
export class CompareAttributesKeys extends BaseValidator {
  constructor(options?: { treshold: number }) {
    const id = "compare-attributes-keys";
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

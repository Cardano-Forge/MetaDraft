import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

function ensureString(image: string | string[]): string {
  return Array.isArray(image) ? image.join("") : image;
}

export class DuplicateImage extends BaseValidator {
  constructor(options?: object) {
    const id = "duplicate-image";
    super(id, options);
  }

  Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, metadatas);
  }

  Logic(assetName: string, metadata: unknown, metadatas: unknown[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const imageCountMap: Record<string, number> = {};

    // Count occurrences of 'image' key in metadatas array
    for (const meta of metadatas) {
      const metadataToCompareWith = Object.values(meta as object)[0]; // Extract the assetName and access the metadata
      if (
        typeof metadataToCompareWith === "object" &&
        metadataToCompareWith !== null &&
        "image" in metadataToCompareWith
      ) {
        const imagePath = ensureString(metadataToCompareWith.image);
        imageCountMap[imagePath] = (imageCountMap[imagePath] || 0) + 1;
      }
    }

    // Log duplicates along with their respective asset names
    const warnings: string[] = [];
    for (const [imagePath, count] of Object.entries(imageCountMap)) {
      // Looking only for the current asset to avoid mixing the errors.
      if (
        "image" in (metadata as object) &&
        imagePath ===
          ensureString((metadata as { image: string | string[] }).image)
      ) {
        if (count > 1) {
          warnings.push(`Duplicate image '${imagePath}' found in assets.`);
        }
      }
    }

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Duplicated images identified across assets.",
          warnings,
        },
      },
      "All checks passed. No issues detected.",
      assetName,
      metadata,
      this.id,
    );
  }
}

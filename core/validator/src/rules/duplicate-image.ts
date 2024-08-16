import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

/**
 * Ensures that the given `image` is a string by joining any array elements.
 *
 * @param {string | string[]} image - The image path to ensure is a string.
 * @returns {string} The ensured string image path.
 */
function ensureString(image: string | string[]): string {
  return Array.isArray(image) ? image.join("") : image;
}

/**
 * A validator that checks if there are any duplicate image paths across assets in the provided metadatas.
 *
 * This validator counts the occurrences of each image path and identifies duplicates based on the count. It assumes that the image path is a string or an array of strings under the 'image' key in each metadata object.
 * @class DuplicateImage
 * @extends BaseValidator
 */
export class DuplicateImage extends BaseValidator {
  /**
   * Constructs a new instance of the `DuplicateImage` validator with an optional configuration object.
   *
   * @param {object} [options] - The options for the validator (not used in this validator).
   */
  constructor(options?: object) {
    const id = "duplicate-image";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadatas.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata associated with the asset.
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @returns {Result[]} An array containing the validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, metadatas);
  }

  /**
   * Logic method to check for duplicate image paths.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {object} metadata - The metadata associated with the asset.
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @returns {Result[]} An array containing the validation results.
   */
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

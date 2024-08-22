import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * A validator that checks if there are any duplicate asset names or image in the provided metadatas.
 *
 * This validator counts the occurrences of each asset name and identifies duplicates based on the count. It assumes that the asset name is the top-level key in each metadata object.
 *
 * @class DuplicateAssetNameAndImage
 * @module Rules
 * @extends BaseValidator
 */
export class DuplicateAssetNameAndImage extends BaseValidator {
  /**
   * Constructs a new instance of the `DuplicateAssetNameAndImage` validator with an optional configuration object.
   *
   * @param {object} [options] - The options for the validator (not used in this validator).
   */
  constructor(options?: object) {
    const id = "duplicate-asset-name-and-image";
    super(id, options, "once");
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
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(
      assetName,
      metadata,
      metadatas as { image: string | string[]; name: string }[],
    );
  }

  /**
   * Logic method to check for duplicate asset names or image.
   *
   * @param {string} _assetName - The name of the asset being validated.
   * @param {object} _metadata - The metadata associated with the asset.
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @returns {Result[]} - Returns an array containing validation results.
   */
  Logic(
    _assetName: string,
    _metadata: unknown,
    metadatas: { image: string | string[]; name: string }[],
  ): Result[] {
    const warnings: { assetName: string; message: string; metadata: object }[] =
      [];
    const seen = {
      images: new Set<string>(),
      names: new Set<string>(),
    };

    const success: { name: string; image: string | string[] }[] = [];

    let errorDetected = false;
    for (const metadata of metadatas) {
      if (
        typeof metadata === "object" &&
        metadata !== null &&
        "image" in metadata
      ) {
        const image: string = Array.isArray(metadata.image)
          ? metadata.image.join("")
          : metadata.image;
        if (seen.images.has(image)) {
          warnings.push({
            metadata: metadata,
            assetName: metadata.name,
            message: `Image: ${metadata.image} has been detected as a duplicate.`,
          });
          errorDetected = true;
        }
        seen.images.add(image);
      }

      if (
        typeof metadata === "object" &&
        metadata !== null &&
        "name" in metadata
      ) {
        if (seen.names.has(metadata.name)) {
          warnings.push({
            metadata: metadata,
            assetName: metadata.name,
            message: `Name: ${metadata.name} has been detected as a duplicate.`,
          });
          errorDetected = true;
        }
        seen.names.add(metadata.name);
      }
      if (!errorDetected === true) {
        success.push(metadata);
      }
    }

    // Rebuilding successes and errors/warnings per asset to update the frontend correctly
    // an image uniqueness is optional, so it shows a warning
    // a name uniqueness is mandatory, so it shows an error
    const states = [
      ...warnings.flatMap((warning) =>
        getStates(
          {
            state:
              warnings.length === 0
                ? "success"
                : seen.names.size > 0
                  ? "error"
                  : "warning",
            message: warning,
          },
          "All checks passed. No issues detected.",
          warning.assetName,
          warning.metadata,
          this.id,
        ),
      ),
      ...success.flatMap(
        (metatada: { name: string; image: string | string[] }) =>
          getStates(
            {
              state: "success",
              message: [],
            },
            "All checks passed. No issues detected.",
            metatada.name,
            metatada,
            this.id,
          ),
      ),
    ];

    return states;
  }
}

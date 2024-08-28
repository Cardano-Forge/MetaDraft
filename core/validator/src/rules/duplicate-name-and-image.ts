import { BaseValidator } from "../core.ts";

import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * A validator that checks if there are any duplicate asset names or image in the provided metadatas.
 *
 * This validator counts the occurrences of each asset name and identifies duplicates based on the count. It assumes that the asset name is the top-level key in each metadata object.
 *
 * @class DuplicateNameAndImage
 * @module Rules
 * @extends BaseValidator
 */
export class DuplicateNameAndImage extends BaseValidator {
  /**
   * Constructs a new instance of the `DuplicateNameAndImage` validator with an optional configuration object.
   *
   * @param {object} [options] - The options for the validator (not used in this validator).
   */
  constructor(options?: object) {
    const id = "duplicate-name-and-image";
    super(id, options, "once");
  }

  /**
   * Executes the validation logic for a given asset and metadatas.
   *
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} An array containing the validation results.
   */
  ExecuteOnce(
    metadatas: object[],
    validations: Record<string, StateOutput>,
  ): Record<string, StateOutput> {
    logger(`Executing ${this.id} with: `, metadatas.length);
    return this.Logic(
      metadatas as { image: string | string[]; name: string }[],
      validations,
    );
  }

  /**
   * Logic method to check for duplicate asset names or image.
   *
   * @param {{ image: string | string[]; name: string }[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} - Returns an array containing validation results.
   */
  Logic(
    metadatas: { image: string | string[]; name: string }[],
    validations: Record<string, StateOutput>,
  ): Record<string, StateOutput> {
    const seen = {
      images: new Set<string>(),
      names: new Set<string>(),
    };

    const success: { name: string; image: string | string[] }[] = [];

    for (const metadata of metadatas) {
      let errorDetected = false;
      let nameDuplicated = false;
      if (
        typeof metadata === "object" &&
        metadata !== null &&
        "image" in metadata
      ) {
        const image: string = Array.isArray(metadata.image)
          ? metadata.image.join("")
          : metadata.image;
        if (seen.images.has(image)) {
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
          errorDetected = true;
          nameDuplicated = true;
        }
        seen.names.add(metadata.name);
      }

      if (!errorDetected) {
        success.push(metadata);
      } else {
        validations[metadata.name].warnings.push({
          validatorId: this.id,
          message: `Name: ${metadata.name} has been detected as a duplicate.`,
        });

        if (nameDuplicated) {
          validations[metadata.name].status = "error";
        } else if (validations[metadata.name].status !== "error") {
          validations[metadata.name].status = "warning";
        }
      }
    }

    return validations;
  }
}

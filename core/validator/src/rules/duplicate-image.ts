import { BaseValidator } from "../core.ts";

import type { Metadata, StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * A validator that checks if there are any duplicate image in the provided metadatas.
 *
 * This validator counts the occurrences of each asset name and identifies duplicates based on the count. It assumes that the asset name is the top-level key in each metadata object.
 *
 * @class DuplicateImage
 * @module Rules
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
    validations: Record<string, StateOutput>
  ): Record<string, StateOutput> {
    logger(`Executing ${this.id} with: `, metadatas.length);
    return this.Logic(metadatas as Metadata[], validations);
  }

  /**
   * Logic method to check for duplicate image.
   *
   * @param {Metadata[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} - Returns an array containing validation results.
   */
  Logic(
    metadatas: Metadata[],
    validations: Record<string, StateOutput>
  ): Record<string, StateOutput> {
    const seen = new Map<string, Metadata>();

    for (const entry of metadatas) {
      const image: string = Array.isArray(entry.metadata.image)
        ? entry.metadata.image.join("")
        : entry.metadata.image;

      const past: Metadata | undefined = seen.get(image);
      if (past) {
        // Create validation if doesn't exist
        if (!validations[entry.assetName]) {
          validations[entry.assetName] = {
            status: "error",
            warnings: [],
            errors: [],
          };
        }
        validations[entry.assetName].status = "error";
        validations[entry.assetName].errors.push({
          validatorId: this.id,
          validationError: new ZodError([
            {
              code: "custom",
              message: `Image: ${image} has been detected as a duplicate.`,
              path: ["image"],
            },
          ]).issues,
        });

        // Create validation of past if doesn't exist
        if (!validations[past.assetName]) {
          validations[past.assetName] = {
            status: "error",
            warnings: [],
            errors: [],
          };
        }

        // Check if error already in the validation
        const hasErrorAlready = validations[past.assetName].errors.find(
          (e) => e.validatorId === this.id
        );

        if (!hasErrorAlready) {
          validations[past.assetName].status = "error";
          validations[past.assetName].errors.push({
            validatorId: this.id,
            validationError: new ZodError([
              {
                code: "custom",
                message: `Image: ${image} has been detected as a duplicate.`,
                path: ["image"],
              },
            ]).issues,
          });
        }
      } else {
        seen.set(image, entry);
      }
    }

    return validations;
  }
}

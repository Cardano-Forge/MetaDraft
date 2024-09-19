import { BaseValidator } from "../core.ts";

import type { Metadata, StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

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
    validations: Record<string, StateOutput>
  ): Record<string, StateOutput> {
    logger(`Executing ${this.id} with: `, metadatas.length);
    return this.Logic(metadatas as Metadata[], validations);
  }

  /**
   * Logic method to check for duplicate asset names or image.
   *
   * @param {Metadata[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} - Returns an array containing validation results.
   */
  Logic(
    metadatas: Metadata[],
    validations: Record<string, StateOutput>
  ): Record<string, StateOutput> {
    const seen = {
      images: new Set<string>(),
      names: new Set<string>(),
    };

    const success: { name: string; image: string | string[] }[] = [];

    for (const entry of metadatas) {
      let errorDetected = false;
      let nameDuplicated = false;
      if (
        typeof entry === "object" &&
        entry !== null &&
        "image" in entry.metadata
      ) {
        const image: string = Array.isArray(entry.metadata.image)
          ? entry.metadata.image.join("")
          : entry.metadata.image;
        if (seen.images.has(image)) {
          errorDetected = true;
        }
        seen.images.add(image);
      }

      if (
        typeof entry === "object" &&
        entry !== null &&
        "name" in entry.metadata
      ) {
        if (seen.names.has(entry.metadata.name)) {
          errorDetected = true;
          nameDuplicated = true;
        }
        seen.names.add(entry.metadata.name);
      }

      if (!errorDetected) {
        success.push(entry.metadata);
      } else {
        if (!validations[entry.assetName]) {
          validations[entry.assetName] = {
            status: "warning",
            warnings: [],
            errors: [],
          };
        }

        if (nameDuplicated) {
          validations[entry.assetName].status = "error";
          validations[entry.assetName].errors.push({
            validatorId: this.id,
            validationError: new ZodError([
              {
                code: "custom",
                message: `Name: ${entry.metadata.name} has been detected as a duplicate.`,
                path: ["name"],
              },
            ]),
          });
        } else {
          validations[entry.assetName].status = "warning";
          validations[entry.assetName].warnings.push({
            validatorId: this.id,
            validationError: new ZodError([
              {
                code: "custom",
                message: `Image: ${entry.metadata.image} has been detected as a duplicate.`,
                path: ["image"],
              },
            ]),
          });
        }
      }
    }

    return validations;
  }
}

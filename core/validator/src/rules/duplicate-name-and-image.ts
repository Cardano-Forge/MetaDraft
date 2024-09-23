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
    const nameErrorsMetadata: Metadata[] = [];
    const nameCount: Record<string, number> = {};
    const imageErrorsMetadata: Metadata[] = [];
    const imageCount: Record<string, number> = {};
   
    // First pass: Count occurrences
    for (const entry of metadatas) {
      // Name
      const name = entry.metadata.name;
      nameCount[name] = (nameCount[name] || 0) + 1;
      // Image
      const image: string = Array.isArray(entry.metadata.image)
        ? entry.metadata.image.join("")
        : entry.metadata.image;
      imageCount[image] = (imageCount[image] || 0) + 1;
    }

    // Second pass: Identify duplicates based on the count
    for (const entry of metadatas) {
      // Name
      const name = entry.metadata.name;
      if (nameCount[name] > 1) {
        nameErrorsMetadata.push(entry);
      }
      // Image
      const image: string = Array.isArray(entry.metadata.image)
        ? entry.metadata.image.join("")
        : entry.metadata.image;
      if (imageCount[image] > 1) {
        imageErrorsMetadata.push(entry);
      }
    }

    // NAME ERRORS
    nameErrorsMetadata.forEach(({ assetName, metadata }) => {
      if (!validations[assetName]) {
        validations[assetName] = {
          status: "warning",
          warnings: [],
          errors: [],
        };
      }

      validations[assetName].status = "warning";
      validations[assetName].warnings.push({
        validatorId: this.id,
        validationError: new ZodError([
          {
            code: "custom",
            message: `Name: ${metadata.name} has been detected as a duplicate.`,
            path: ["name"],
          },
        ]),
      });
    });

    // IMAGE ERRORS
    imageErrorsMetadata.forEach(({ assetName, metadata }) => {
      if (!validations[assetName]) {
        validations[assetName] = {
          status: "warning",
          warnings: [],
          errors: [],
        };
      }
      const image: string = Array.isArray(metadata.image)
        ? metadata.image.join("")
        : metadata.image;

      validations[assetName].status = "warning";
      validations[assetName].warnings.push({
        validatorId: this.id,
        validationError: new ZodError([
          {
            code: "custom",
            message: `Image: ${image} has been detected as a duplicate.`,
            path: ["image"],
          },
        ]),
      });
    });

    return validations;
  }
}

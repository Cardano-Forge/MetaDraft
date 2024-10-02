import { BaseValidator } from "../core.ts";

import type { Metadata, StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";
import { ZodError } from "zod";

/**
 * A validator that checks if there are any duplicate asset names in the provided metadatas.
 *
 * This validator counts the occurrences of each asset name and identifies duplicates based on the count. It assumes that the asset name is the top-level key in each metadata object.
 *
 * @class DuplicateAssetName
 * @module Rules
 * @extends BaseValidator
 */
export class DuplicateAssetName extends BaseValidator {
  /**
   * Constructs a new instance of the `DuplicateAssetName` validator with an optional configuration object.
   *
   * @param {object} [options] - The options for the validator (not used in this validator).
   */
  constructor(options?: object) {
    const id = "duplicate-asset-name";
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
   * Logic method to check for duplicate asset names.
   *
   * @param {Metadata[]} metadatas - An array of all metadatas being validated.
   * @param {Record<string, StateOutput>} validations - An object of all validations made.
   * @returns {Record<string, StateOutput>} - Returns an array containing validation results.
   */
  Logic(
    metadatas: Metadata[],
    validations: Record<string, StateOutput>
  ): Record<string, StateOutput> {
    const seen = new Set<string>();
    const duplicate = new Set<string>();

    for (const entry of metadatas) {
      if (seen.has(entry.assetName)) {
        duplicate.add(entry.assetName);
      } else {
        seen.add(entry.assetName);
      }
    }

    for (const entry of metadatas) {
      if (duplicate.has(entry.assetName)) {
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
          validationErrors: new ZodError([
            {
              code: "custom",
              message: `AssetName: ${entry.assetName} has been detected as a duplicate. (metadata.name = ${entry.metadata.name})`,
              path: [],
            },
          ]).issues,
        });
      }
    }

    return validations;
  }
}

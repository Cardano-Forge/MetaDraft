import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";

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
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, metadatas as object[]);
  }

  /**
   * Logic method to check for duplicate asset names.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {object} metadata - The metadata associated with the asset.
   * @param {object[]} metadatas - An array of all metadatas being validated.
   * @returns {Result[]} - Returns an array containing validation results.
   */
  Logic(assetName: string, metadata: unknown, metadatas: object[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const assetNames = metadatas.reduce(
      (acc: Record<string, number>, metadata: object) => {
        // TODO: the top level format must match this getter
        // Need to determine the way we want to handle the assetName within the metadata
        const key: string | undefined = Object.keys(metadata)[0];
        if (!key) throw new Error("Asset name is undefined");
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {},
    );

    const warnings: string[] = [];
    if (assetNames[assetName] && assetNames[assetName] > 1) {
      warnings.push(assetName);
    }

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Duplicated asset name identified.",
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

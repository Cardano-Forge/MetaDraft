import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkImageIsStringOrArray } from "./zod.ts";
import type { Result } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata contains an "image" field formatted as a string URL or array of strings.
 *
 * @class KeyImageValidator
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyImageValidator extends BaseValidator {
  /**
   * Creates an instance of KeyImageValidator.
   *
   * @param options - Optional configuration for the validator.
   */
  constructor(options?: object) {
    const id = "key-image";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an "image" field formatted as a string URL or array of strings.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {Result[]} An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyImageValidator.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an "image" field formatted as a string URL or array of strings.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        image: checkImageIsStringOrArray,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`image` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

import z from "zod";

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { checkImageIsStringOrArray } from "./zod.ts";
import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata contains an "image" field formatted as a string URL or array of strings.
 *
 * @class KeyImage
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyImage extends BaseValidator {
  /**
   * Creates an instance of KeyImage.
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
   * @returns {StateOutput} An array of validation results.
   */
  override Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyImage.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an "image" field formatted as a string URL or array of strings.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {StateOutput} An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const result = z
      .object({
        image: checkImageIsStringOrArray,
      })
      .safeParse(metadata);

    return GetValidationOutput(result, assetName, this.id);
  }
}

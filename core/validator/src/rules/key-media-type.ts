import z from "zod";

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { checkMediaType } from "./zod.ts";
import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata has a valid optional `mediaType` field matching a predefined regex pattern.
 *
 * @class KeyMediaType
 * @module Rules
 * @extends BaseValidator
 */
export class KeyMediaType extends BaseValidator {
  /**
   * Creates an instance of KeyMediaType.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-media-type";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Should contain a valid `mediaType` field.
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
   * The core validation logic for the KeyMediaType class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Should contain a valid `mediaType` field.
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
        mediaType: checkMediaType.optional(),
      })
      .safeParse(metadata);

    return GetValidationOutput(result, assetName, this.id);
  }
}

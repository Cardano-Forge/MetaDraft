import z from "zod";

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata for a given asset has an optional "description" field no longer than 64 characters.
 *
 * @class KeyDescription
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyDescription extends BaseValidator {
  /**
   * Creates an instance of KeyDescription.
   *
   * @param options - Optional configuration for the validator.
   */
  constructor(options?: object) {
    const id = "key-description";
    super(id, options); // the description is not mandatory.
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an optional "description" field.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
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
   * The core validation logic for the KeyDescription.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an optional "description" field.
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
        description: checkSize64.optional(),
      })
      .safeParse(metadata);

    return GetValidationOutput(result, assetName, this.id);
  }
}

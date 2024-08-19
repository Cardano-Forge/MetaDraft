import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMedia } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata optionally contains a valid `media` object with valid media-related values.
 *
 * @class KeyMediaValidator
 * @module Rules
 * @extends BaseValidator
 */
export class KeyMediaValidator extends BaseValidator {
  /**
   * Creates an instance of KeyMediaValidator.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-media";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. It should optionally contain a valid `media` object with media-related values.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {Result[]} An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The core validation logic for the KeyMediaValidator class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. It should optionally contain a valid `media` object with media-related values.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        media: checkMedia.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`media` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

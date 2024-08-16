import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMediaType } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has a valid `mediaType` field matching a predefined regex pattern.
 *
 * @class KeyMediaTypeValidator
 * @module Rules
 * @extends BaseValidator
 */
export class KeyMediaTypeValidator extends BaseValidator {
  /**
   * Creates an instance of KeyMediaTypeValidator.
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
   * @param metadata - The metadata object to validate. Must contain a valid `mediaType` field.
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
   * The core validation logic for the KeyMediaTypeValidator class.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Must contain a valid `mediaType` field.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        mediaType: checkMediaType,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`mediaType` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

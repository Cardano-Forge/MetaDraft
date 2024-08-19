import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata for a given asset has an optional "description" field no longer than 64 characters.
 *
 * @class KeyDescriptionValidator
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyDescriptionValidator extends BaseValidator {
  /**
   * Creates an instance of KeyDescriptionValidator.
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
   * The core validation logic for the KeyDescriptionValidator.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an optional "description" field.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        description: checkSize64.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`description` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

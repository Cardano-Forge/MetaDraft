import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkTraits } from "./zod.ts";
import type { Result } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates metadata object has optional "traits" field using Zod schema.
 *
 * @class KeyTraitsValidator
 * @module Rules
 * @extends BaseValidator
 */
export class KeyTraitsValidator extends BaseValidator {
  /**
   * Creates an instance of KeyTraitsValidator.
   *
   * @param options - Optional configuration for the validator. Currently not used.
   */
  constructor(options?: object) {
    const id = "key-traits";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata using Zod schema.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Should have an optional "traits" field matching the Zod schema.
   * @param _metadatas - An array of metadata objects, ignored in this validator.
   * @returns {Result[]} An array of validation results indicating whether the "traits" field matches the Zod schema.
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
   * Validates the input metadata using Zod schema for optional "traits" field.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {z.SafeParseResult} The validation result indicating whether the "traits" field matches the Zod schema.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        traits: checkTraits.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`traits` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

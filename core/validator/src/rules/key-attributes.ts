import z from "zod";

import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";
import { checkAttributes } from "./zod.ts";
import type { StateOutput } from "../utils/types.ts";
import { logger } from "../utils/logger.ts";

/**
 * Validates that metadata has an optional "attributes" field with correct formatting using zod.
 *
 * @class KeyAttributes
 * @module Rules
 * @extends BaseValidator
 */
export class KeyAttributes extends BaseValidator {
  /**
   * Creates an instance of KeyAttributes validator.
   *
   * @param {object} [options] - The options for the validator.
   */
  constructor(options?: object) {
    const id = "key-attributes";
    super(id, options);
  }

  /**
   * Executes the validation logic for the "attributes" field in metadata using zod.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  override Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The main validation logic for the "attributes" field using zod.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    const result = z
      .object({
        attributes: checkAttributes.optional(),
      })
      .safeParse(metadata);

    return GetValidationOutput(
      result,
      assetName,
      this.id,
    );
  }
}

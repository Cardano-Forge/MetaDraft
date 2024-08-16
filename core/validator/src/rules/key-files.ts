import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkFiles } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata for a given asset has an optional "files" field formatted as an array of file objects.
 *
 * @class KeyFilesValidator
 * @module Rules
 * @extends BaseValidator
 *
 */
export class KeyFilesValidator extends BaseValidator {
  /**
   * Creates an instance of KeyFilesValidator.
   *
   * @param options - Optional configuration for the validator.
   */
  constructor(options?: object) {
    const id = "key-files";
    super(id, options);
  }

  /**
   * Executes the validation logic for a given asset and metadata.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an optional "files" field formatted as an array of file objects.
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
   * The core validation logic for the KeyFilesValidator.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata object to validate. Expects an optional "files" field formatted as an array of file objects.
   * @param _metadatas - Ignored; included for compatibility with BaseValidator.
   * @returns {Result[]} An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        files: checkFiles.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`files` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

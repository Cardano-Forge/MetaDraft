import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

/**
 * A validator ensuring that metadata includes essential fields such as "name", "description", and "image".
 *
 * @class HasRequiredKeysValidator
 * @extends BaseValidator
 */
export class HasRequiredKeysValidator extends BaseValidator {
  /**
   * Creates an instance of HasRequiredKeysValidator.
   *
   * @param {object} [options] - The options for the validator.
   */
  constructor(options?: object) {
    const id = "has-required-keys";
    super(id, options);
  }

  /**
   * Executes the validation logic for required keys in metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {Result[]} - An array of validation results.
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
   * The main validation logic for checking required keys in metadata.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {Result[]} - An array of validation results.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const keys = Object.keys(metadata as object);

    const policyId = ["name", "image"];

    const hasAllRequiredKeys = policyId.every((requiredKey) =>
      keys.some((key) => key === requiredKey),
    );

    return getStates(
      {
        state: hasAllRequiredKeys ? "success" : "error",
        message: `Required keys missing: ["name", "description", "image", "mediaType"]. Keys received: ${keys.join(", ")}`,
      },
      "All required keys are present.",
      assetName,
      metadata,
      this.id,
    );
  }
}

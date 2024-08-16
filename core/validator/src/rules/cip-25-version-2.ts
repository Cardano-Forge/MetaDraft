import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkHex } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * A validator for CIP-25 version 2 assets.
 *
 * This validator uses Zod schema to validate metadata against policy ID and asset name format.
 *
 * @class Cip25Version2Validator
 * @extends BaseValidator
 */
export class Cip25Version2Validator extends BaseValidator {
  /**
   * Creates a new instance of Cip25Version2Validator.
   *
   * @param options - Optional configuration options for the validator.
   */
  constructor(options?: object) {
    const id = "cip-25-version-2";
    super(id, options);
  }

  /**
   * Validates metadata against CIP-25 Version 2 standards using Zod schema.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
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
   * The core validation logic using Zod schema for CIP-25 Version 2 standards.
   *
   * @param assetName - The name of the asset being validated.
   * @param metadata - The metadata to validate.
   * @param _metadatas - An array of metadata objects, currently unused but provided for consistency with other validators.
   * @returns An array of results from validation checks.
   */
  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        assetName: checkHex,
        policyId: checkHex,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`assetName` and `policyId` fields are valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

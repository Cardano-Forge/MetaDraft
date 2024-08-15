import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkHex } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates metadata against CIP-25 Version 2 standards using Zod.
 */
export class Cip25Version2Validator extends BaseValidator {
  constructor(options?: object) {
    const id = "cip-25-version-2";
    super(id, options);
  }

  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

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

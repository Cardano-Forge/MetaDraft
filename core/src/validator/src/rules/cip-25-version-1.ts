import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkHex56, checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates metadata for CIP-25 version 1 assets using Zod schema and checks against policy ID and asset name format.
 */
export class Cip25Version1Validator extends BaseValidator {
  constructor(options?: object) {
    const id = "cip-25-version-1";
    super(id, options);
  }

  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata, assetName);
    return this.Logic(assetName, metadata, _metadatas);
  }

  Logic(assetName: string, metadata: unknown, _metadatas: unknown[]): Result[] {
    const result = z
      .object({
        assetName: checkSize64,
        policyId: checkHex56,
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

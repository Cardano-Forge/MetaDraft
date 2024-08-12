import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkHex56, checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

// Validates metadata for CIP-25 version 1 assets using Zod schema and checks against policy ID and asset name format.
export class Cip25Version1Validator extends BaseValidator {
  constructor() {
    const id = "cip-25-version-1";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata, asset_name);
    return this.Logic(asset_name, metadata, _metadatas);
  }

  Logic(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    const result = z
      .object({
        asset_name: checkSize64,
        policy_id: checkHex56,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`asset_name` and `policy_id` fields are valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

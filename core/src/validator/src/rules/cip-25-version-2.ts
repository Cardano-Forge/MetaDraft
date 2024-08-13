import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkHex } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates metadata against CIP-25 Version 2 standards using Zod.
 */
export class Cip25Version2Validator extends BaseValidator {
  constructor() {
    const id = "cip-25-version-2";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(asset_name, metadata, _metadatas);
  }

  Logic(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    const result = z
      .object({
        asset_name: checkHex,
        policy_id: checkHex,
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

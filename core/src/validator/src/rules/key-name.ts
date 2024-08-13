import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures `name` field in metadata has valid size (<= 64 characters).
 */
export class KeyNameValidator extends BaseValidator {
  constructor() {
    const id = "key-name";
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
        name: checkSize64,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`name` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkImageIsStringOrArray } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures metadata contains an "image" field as a string URL or array of strings.
 */
export class KeyImageValidator extends BaseValidator {
  constructor() {
    const id = "key-image";
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
        image: checkImageIsStringOrArray,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`image` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

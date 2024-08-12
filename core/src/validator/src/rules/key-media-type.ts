import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMediaType } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has a valid `mediaType` field matching regex.
 */
export class KeyMediaTypeValidator extends BaseValidator {
  constructor() {
    const id = "key-media-type";
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
        mediaType: checkMediaType,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`mediaType` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

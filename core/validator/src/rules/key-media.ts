import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMedia } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata contains optional `media` object with valid media-related value.
 */
export class KeyMediaValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-media";
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
        media: checkMedia.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`media` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

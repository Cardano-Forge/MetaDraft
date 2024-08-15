import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMediaType } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has a valid `mediaType` field matching regex.
 */
export class KeyMediaTypeValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-media-type";
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
        mediaType: checkMediaType,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`mediaType` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

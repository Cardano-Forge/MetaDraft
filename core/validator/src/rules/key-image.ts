import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkImageIsStringOrArray } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures metadata contains an "image" field as a string URL or array of strings.
 */
export class KeyImageValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-image";
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
        image: checkImageIsStringOrArray,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`image` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

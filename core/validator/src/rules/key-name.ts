import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures `name` field in metadata has valid size (<= 64 characters).
 */
export class KeyNameValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-name";
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
        name: checkSize64,
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`name` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

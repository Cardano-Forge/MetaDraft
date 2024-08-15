import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkTraits } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates metadata object has optional "traits" field using Zod schema.
 */
export class KeyTraitsValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-traits";
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
        traits: checkTraits.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`traits` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

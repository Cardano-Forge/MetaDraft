import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkAttributes } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has an optional "attributes" field with correct formatting.
 */
export class KeyAttributesValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-attributes";
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
        attributes: checkAttributes.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`attributes` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

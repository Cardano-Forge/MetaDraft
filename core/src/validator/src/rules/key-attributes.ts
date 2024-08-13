import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkAttributes } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Validates that metadata has an optional "attributes" field with correct formatting.
 */
export class KeyAttributesValidator extends BaseValidator {
  constructor() {
    const id = "key-attributes";
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
        attributes: checkAttributes.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`attributes` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

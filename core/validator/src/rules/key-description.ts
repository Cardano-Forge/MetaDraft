import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkSize64 } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures that metadata has an optional "description" field no longer than 64 characters.
 */
export class KeyDescriptionValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "key-description";
    super(id, options); // the description is not mandatory.
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
        description: checkSize64.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`description` field is valid.",
      assetName,
      metadata,
      this.id,
    );
  }
}

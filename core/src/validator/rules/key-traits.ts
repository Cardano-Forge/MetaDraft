import z from "npm:zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkTraits } from "./zod.ts";
import type { Result } from "../utils/types.ts";

export class KeyTraitsValidator extends BaseValidator {
  constructor() {
    const id = "key-traits";
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
        traits: checkTraits.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`traits` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

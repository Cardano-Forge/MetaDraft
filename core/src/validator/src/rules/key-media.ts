import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkMedia } from "./zod.ts";
import type { Result } from "../utils/types.ts";

export class KeyMediaValidator extends BaseValidator {
  constructor() {
    const id = "key-media";
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
        attributes: checkMedia.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`media` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

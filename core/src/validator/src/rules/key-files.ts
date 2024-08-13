import z from "zod";

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { checkFiles } from "./zod.ts";
import type { Result } from "../utils/types.ts";

/**
 * Ensures that metadata has an optional "files" field formatted as an array of file objects.
 */
export class KeyFilesValidator extends BaseValidator {
  constructor() {
    const id = "key-files";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(asset_name, metadata, metadatas);
  }

  Logic(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    const result = z
      .object({
        files: checkFiles.optional(),
      })
      .safeParse(metadata);

    return getStates(
      result,
      "`files` field is valid.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

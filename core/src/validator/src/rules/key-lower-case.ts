import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { KeyWithPath, Result } from "../utils/types.ts";
import { isLowerCaseWords } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

/**
 * Ensures metadata keys follow Lower Case formatting (all lowercase, words separated by space).
 */
export class KeyLowerCase extends BaseValidator {
  constructor() {
    const id = "key-lower-case";
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
    const isInvalid = metadataValidator(asset_name, metadata, this.id);
    if (isInvalid) return isInvalid;

    let warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!isLowerCaseWords(key.key)) {
        warnings.push(key);
      }
    });

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Lower Case formatting.",
          warnings,
        },
      },
      "All checks passed. No issues detected.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

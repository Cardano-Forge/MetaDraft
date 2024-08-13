import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { KeyWithPath, Result } from "../utils/types.ts";

import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

/**
 * Enforces that metadata keys are alphanumeric, allowing dashes and underscores.
 */
export class KeyAlphanumeric extends BaseValidator {
  constructor() {
    const id = "key-alphanumeric";
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
    const alphanumeric = /^[a-zA-Z0-9-_]+$/;
    const isInvalid = metadataValidator(asset_name, metadata, this.id);
    if (isInvalid) return isInvalid;

    let warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!alphanumeric.test(key.key)) {
        warnings.push(key);
      }
    });

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message:
            "Only alphanumeric characters, dashes, and underscores are allowed for the key.",
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

import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { KeyWithPath, Result } from "../utils/types.ts";
import { isUpperCaseWords } from "../utils/casing.ts";
import { extractKeysWithPaths } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

/**
 * Ensures metadata keys follow Upper Case words format.
 */
export class KeyUpperCase extends BaseValidator {
  constructor(options?: object) {
    const id = "key-upper-case";
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
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings: KeyWithPath[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    keys.forEach((key) => {
      if (!isUpperCaseWords(key.key)) {
        warnings.push(key);
      }
    });

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Some keys do not adhere to Upper Case formatting.",
          warnings,
        },
      },
      "All checks passed. No issues detected.",
      assetName,
      metadata,
      this.id,
    );
  }
}

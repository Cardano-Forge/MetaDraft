import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { findWhitespace } from "../utils/whiteSpace.ts";

export class KeyWhiteSpace extends BaseValidator {
  constructor(options?: object) {
    const id = "key-white-space";
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

    const warnings: { path: string[]; whitespaceLocation: string }[] =
      findWhitespace(metadata as object);

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Trailing whitespaces found in the JSON object.",
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

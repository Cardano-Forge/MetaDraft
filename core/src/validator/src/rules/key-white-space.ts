import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { findWhitespace } from "../utils/whiteSpace.ts";

export class KeyWhiteSpace extends BaseValidator {
  constructor() {
    const id = "key-white-space";
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

    const warnings: { path: string[]; whitespaceLocation: string }[] =
      findWhitespace(metadata as object);

    // console.debug("Results", warnings, warnings.length);

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Trailing whitespaces found in the JSON object.",
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

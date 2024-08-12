import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import {
  countKeys,
  extractKeysWithPaths,
  formatPaths,
  getPathsForExceedingKeys,
} from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

export class DuplicateKeysValidator extends BaseValidator {
  private threshold = 3;

  constructor() {
    const id = "duplicate-keys";
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

    let warnings: {
      field: string;
      paths: string[] | undefined;
      occurences: number;
    }[] = [];

    const keys = extractKeysWithPaths(metadata as object);
    // console.debug("KEYS", keys);

    const keyCounts = countKeys(keys);
    // console.debug(keyCounts);

    const paths = getPathsForExceedingKeys(keys, keyCounts, this.threshold);
    // console.debug(paths);

    if (paths.length > 0) {
      warnings = formatPaths(paths, keyCounts) || [];
    }
    // console.debug("WARNINGS", warnings);

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message:
            "Some keys appear multiple times within the provided metadata. The following keys were found more than once",
          warnings,
        },
      },
      "No significant duplicates detected in the metadata.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

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

/**
 * A validator that checks metadata for duplicate keys exceeding a specified threshold.
 */
export class DuplicateKeysValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "duplicate-keys";
    super(id, { threshold: 3, ...options });
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

    let warnings: {
      field: string;
      paths: string[] | undefined;
      occurences: number;
    }[] = [];

    const keys = extractKeysWithPaths(metadata as object);

    const keyCounts = countKeys(keys);

    const paths = getPathsForExceedingKeys(
      keys,
      keyCounts,
      this.options.threshold,
    );

    if (paths.length > 0) {
      warnings = formatPaths(paths, keyCounts) || [];
    }

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
      assetName,
      metadata,
      this.id,
    );
  }
}

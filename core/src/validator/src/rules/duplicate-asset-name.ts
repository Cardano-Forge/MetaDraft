import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

export class DuplicateAssetName extends BaseValidator {
  constructor(options?: object) {
    const id = "duplicate-asset-name";
    super(id, options);
  }

  Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Result[] {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, metadatas as object[]);
  }

  Logic(assetName: string, metadata: unknown, metadatas: object[]): Result[] {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const assetNames = metadatas.reduce(
      (acc: Record<string, number>, metadata: object) => {
        // TODO: the top level format must match this getter
        // Need to determine the way we want to handle the assetName within the metadata
        const key: string | undefined = Object.keys(metadata)[0];
        if (!key) throw new Error("Asset name is undefined");
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {},
    );

    const warnings: string[] = [];
    if (assetNames[assetName] && assetNames[assetName] > 1) {
      warnings.push(assetName);
    }

    return getStates(
      {
        state: warnings.length === 0 ? "success" : "warning",
        message: {
          message: "Duplicated asset name identified.",
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

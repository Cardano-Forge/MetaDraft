import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";

import type { Result } from "../utils/types.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";

export class DuplicateAssetName extends BaseValidator {
  constructor() {
    const id = "duplicate-asset-name";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(asset_name, metadata, metadatas as object[]);
  }

  Logic(asset_name: string, metadata: unknown, metadatas: object[]): Result[] {
    const isInvalid = metadataValidator(asset_name, metadata, this.id);
    if (isInvalid) return isInvalid;

    const assetNames = metadatas.reduce(
      (acc: Record<string, number>, metadata: object) => {
        const key = Object.keys(metadata)[0];
        acc[key] = (acc[key] || 0) + 1;
        return acc;
      },
      {},
    );

    const warnings: string[] = [];
    if (assetNames[asset_name] > 1) {
      warnings.push(asset_name);
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
      asset_name,
      metadata,
      this.id,
    );
  }
}

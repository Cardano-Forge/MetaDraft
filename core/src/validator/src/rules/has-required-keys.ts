import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

/**
 * A validator ensuring that metadata includes essential fields such as "name", "description", and "image".
 */
export class HasRequiredKeysValidator extends BaseValidator {
  constructor() {
    const id = "has-required-keys";
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

    const keys = Object.keys(metadata as object);

    const required_keys = ["name", "image"];

    const hasAllRequiredKeys = required_keys.every((requiredKey) =>
      keys.some((key) => key === requiredKey),
    );

    return getStates(
      {
        state: hasAllRequiredKeys ? "success" : "error",
        message: `Required keys missing: ["name", "description", "image", "mediaType"]. Keys received: ${keys.join(", ")}`,
      },
      "All required keys are present.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

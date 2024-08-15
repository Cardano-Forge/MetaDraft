import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

/**
 * A validator ensuring that metadata includes essential fields such as "name", "description", and "image".
 */
export class HasRequiredKeysValidator extends BaseValidator {
  constructor(options?: object) {
    const id = "has-required-keys";
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

    const keys = Object.keys(metadata as object);

    const policyId = ["name", "image"];

    const hasAllRequiredKeys = policyId.every((requiredKey) =>
      keys.some((key) => key === requiredKey),
    );

    return getStates(
      {
        state: hasAllRequiredKeys ? "success" : "error",
        message: `Required keys missing: ["name", "description", "image", "mediaType"]. Keys received: ${keys.join(", ")}`,
      },
      "All required keys are present.",
      assetName,
      metadata,
      this.id,
    );
  }
}

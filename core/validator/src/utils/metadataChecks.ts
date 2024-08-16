import { getStates } from "./getState.ts";
import { Result } from "./types.ts";

/**
 * Validates if the provided metadata is a non-null object. If not, it returns an error state using `getStates`.
 * @category Utils
 * @param {string} assetName - The name of the asset.
 * @param {unknown} metadata - The metadata to validate. It should be a non-null object.
 * @param {string} requester - The ID or name of the entity requesting this validation.
 *
 * @returns {Result[] | undefined}
 *    If metadata is not an object, returns an error state with the message:
 *    "Metadata must be a non-null object.". Otherwise, it returns `undefined`.
 */
export function metadataValidator(
  assetName: string,
  metadata: unknown,
  requester: string,
): Result[] | undefined {
  if (typeof metadata !== "object" || metadata === null) {
    return getStates(
      {
        state: "error",
        message: `Metadata must be a non-null object.`,
      },
      "",
      assetName,
      metadata,
      requester,
    );
  }
  return undefined;
}

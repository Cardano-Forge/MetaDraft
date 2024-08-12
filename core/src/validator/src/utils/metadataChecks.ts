import { getStates } from "./getState.ts";

/**
 * Check and return custom message when the received metadata is not an object
 * Will keep it that way to provide extra flexibility in case we want to validate native types as well.
 */
export function metadataValidator(
  asset_name: string,
  metadata: unknown,
  requester: string,
) {
  if (typeof metadata !== "object" || metadata === null) {
    return getStates(
      {
        state: "error",
        message: `Metadata must be a non-null object.`,
      },
      "",
      asset_name,
      metadata,
      requester,
    );
  }
}

import type { ProjectCollection, Status } from "./types";

export const keys: Record<Status, keyof ProjectCollection> = {
  unchecked: "unchecked",
  error: "errorsDetected",
  warning: "errorsFlagged",
  success: "valids",
};

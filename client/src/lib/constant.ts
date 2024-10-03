import { type Rule } from "./rules";
import type { ProjectCollection, Status } from "./types";

export const keys: Record<Status, keyof ProjectCollection> = {
  unchecked: "unchecked",
  error: "errorsDetected",
  warning: "errorsFlagged",
  success: "valids",
};

export const DEFAULT_RULES: Rule[] = [
  "duplicateNameAndImage",
  "duplicateAssetName",
  "duplicateKeys",
  "hasRequiredKeys",
  "compareRootKeys",
  "compareRootValues",
  "compareAttributesKeys",
  "keyName",
  "keyLength",
  "keyMediaType",
  "keyImage",
  "keyFiles",
  "keyAnvilCase",
];

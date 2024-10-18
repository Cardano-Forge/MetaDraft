import { type Rule } from "./rules";
import type {
  MetadataCollectionEditor,
  ProjectCollection,
  Status,
} from "./types";

export const keys: Record<Status, keyof ProjectCollection> = {
  unchecked: "unchecked",
  error: "errorsDetected",
  warning: "errorsFlagged",
  success: "valids",
};

export const DEFAULT_CIP25_SCHEMA: MetadataCollectionEditor = {
  assetName: "text",
  metadata: {
    name: "text",
    image: "text",
    mediaType: "text",
    description: "text",
    files: [
      {
        src: "text",
        mediaType: "text",
      },
    ],
    attributes: {},
  },
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

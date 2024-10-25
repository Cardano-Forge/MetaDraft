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
  assetName: "asset_name",
  metadata: {
    name: "Anvil #",
    image: "ipfs://...",
    mediaType: "image/png",
    description: "We understand blockchain so you don't have to.",
    website: "https://ada-anvil.io/",
    files: [
      {
        src: "ipfs://...",
        mediaType: "image/png",
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

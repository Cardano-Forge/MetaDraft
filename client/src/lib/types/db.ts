import { type StateOutput } from "@ada-anvil/metadraft-validator";
import type { CIP25, Status } from "../types";
import { type MetadataCollectionSchemaV2 } from "../zod-schemas";
import { type z } from "zod";
import { type Rule } from "../rules";

export type MyDatabase = {
  metadata: MetadataCollection;
  validations: ValidationsCollection;
  project: ProjectCollection;
};

export type MetadataCollection = {
  id: string;
  assetName: string;
  metadata: CIP25;
  status: Status;
};

export type MetadataSchemaCollection = {
  id: string;
  schema: MetadataCollectionEditor;
};

export type ValidationsCollection = {
  id: string;
  assetName: string;
  validation: StateOutput;
};

export type ProjectCollection = {
  id: string;
  name: string;
  nfts: number;
  unchecked: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

export type RulesCollection = {
  id: string;
  rules: Rule[];
};

export type MetadataCollectionEditor = z.infer<
  typeof MetadataCollectionSchemaV2
>;

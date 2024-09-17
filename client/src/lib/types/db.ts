import { type StateOutput } from "@ada-anvil/metadraft-validator";
import type { CIP25, Status } from "../types";

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

export type ValidationsCollection = {
  id: string;
  assetName: string;
  validation: StateOutput;
};

export type ProjectCollection = {
  id: string;
  metadataId: string;
  name: string;
  nfts: number;
  unchecked: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

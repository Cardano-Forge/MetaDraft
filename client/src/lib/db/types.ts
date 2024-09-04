import type { MetatdataJSON, ValidatorResults } from "../types";

export type ActiveProject = {
  id: string;
  metadataId: string;
};

export type Metadata = {
  id: string;
  data: MetatdataJSON;
};

export type MetadataValidations = {
  id: string;
  validations: ValidatorResults;
};

export type Project = {
  id: string;
  name: string;
  nfts: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

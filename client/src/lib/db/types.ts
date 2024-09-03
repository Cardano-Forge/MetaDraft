export type ActiveProject = {
  id: string;
  metadataId: string;
};

export type Metadata = {
  id: string;
  data: Record<string, unknown>[];
};

export type MetadataValidations = {
  id: string;
  data: Record<string, Record<string, unknown>>;
};

export type Project = {
  id: string;
  name: string;
  nfts: number;
  errorsDetected: number;
  errorsFlagged: number;
  valids: number;
};

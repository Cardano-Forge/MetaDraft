export type ActiveProject = {
  id: string;
  metadataId: string;
};

export type Metadata = {
  id: string;
  data: Record<string, unknown>[];
};

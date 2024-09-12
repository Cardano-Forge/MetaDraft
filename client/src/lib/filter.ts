import type { MetatdataJSON } from "./types";

export const filter = (
  metadata: MetatdataJSON,
  searchTerm: string | null,
): MetatdataJSON => {
  if (!searchTerm) return metadata;

  return metadata.filter(
    (meta) =>
      meta.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meta.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

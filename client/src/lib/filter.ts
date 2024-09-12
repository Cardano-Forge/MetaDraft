import type { MetatdataJSON } from "./types";

export const filter = (
  metadata: MetatdataJSON,
  searchTerm: string | null,
): MetatdataJSON => {
  if (!searchTerm) return metadata;
  const filtered: MetatdataJSON = [];

  metadata.forEach((meta) => {
    if (
      meta.assetName.includes(searchTerm) ||
      meta.metadata.name.includes(searchTerm)
    ) {
      filtered.push(meta);
    }
  });

  return filtered;
};

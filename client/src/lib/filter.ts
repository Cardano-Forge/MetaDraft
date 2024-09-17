import { type MetadataCollection } from "~/lib/types";

/**
 * Filters the metadata array based on a search term. It searches the `assetName`
 * and the `metadata.name` fields for matches.
 *
 * @param {MetadataCollection[]} metadata - The array of metadata objects to be filtered.
 * @param {string | null} searchTerm - The search term used to filter the metadata. If `null`, the entire metadata array is returned.
 * @returns {MetadataCollection[]} - The filtered array of metadata that includes the search term.
 */
export const filter = (
  metadata: MetadataCollection[],
  searchTerm: string | null,
): MetadataCollection[] => {
  if (!searchTerm) return metadata;

  return metadata.filter(
    (meta) =>
      meta.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      meta.metadata.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

import { type MetadataCollection } from "~/lib/types";

/**
 * Filters an array of metadata collections based on a search term.
 *
 * @param {MetadataCollection[]} metadata - An array of metadata collections to be filtered.
 * @param {string | null} searchTerm - The search term to filter the metadata collections by. If `null`, no filtering is applied.
 * @returns {MetadataCollection[]} - The filtered array of metadata collections that match the search term.
 *
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

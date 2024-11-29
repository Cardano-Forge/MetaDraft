import { z } from "zod";

import type { MetadataSchemaCollection, MetadataCollection } from "../types";

const recordSchema = z.record(z.string());

export const getAttributesDistributions = (
  metadata: MetadataCollection[],
  schema: MetadataSchemaCollection,
  sortBy: "alpha" | "size",
) => {
  if (!schema.schema.metadata.attributes) return {};

  const attributeCounts: Record<string, Record<string, number>> = {};

  Object.keys(schema.schema.metadata.attributes).forEach((key) => {
    attributeCounts[key] = {};
  });

  metadata.forEach((asset) => {
    const schemaValidations = recordSchema.safeParse(asset.metadata.attributes);

    if (schemaValidations.success) {
      const attributes = schemaValidations.data;
      Object.keys(attributes).forEach((key) => {
        const value = attributes[key]!;
        if (attributeCounts[key]) {
          attributeCounts[key][value] ??= 0; // Initialize
          attributeCounts[key][value]++; // Increment
        }
      });
    }
  });

  // Sort attributes[key] by alpha or size
  const sortedAttributeCounts = Object.fromEntries(
    Object.entries(attributeCounts).map(([key, counts]) => {
      const sortedCounts = Object.entries(counts).sort(
        ([valA, countA], [valB, countB]) => {
          if (sortBy === "alpha") return valA.localeCompare(valB);
          if (sortBy === "size") return countB - countA;
          return 0;
        },
      );
      return [key, Object.fromEntries(sortedCounts)];
    }),
  );

  // Sort the top-level attributes alphabetically
  const alphaSortedAttributeCounts = Object.fromEntries(
    Object.entries(sortedAttributeCounts).sort(([keyA], [keyB]) =>
      keyA.localeCompare(keyB),
    ),
  );

  return alphaSortedAttributeCounts;
};

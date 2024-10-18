import { z } from "zod";

import type { MetadataSchemaCollection, MetadataCollection } from "../types";

const recordSchema = z.record(z.string());

export const getAttributesDistributions = (
  metadata: MetadataCollection[],
  schema: MetadataSchemaCollection,
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

  return attributeCounts;
};

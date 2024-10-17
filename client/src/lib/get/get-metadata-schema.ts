import { DEFAULT_CIP25_SCHEMA } from "../constant";
import type { MetadataCollection, Structure } from "../types";
import { getObjectStructureWithTypes } from "./get-object-structure-with-types";

export const getMetadataSchema = (metadata: MetadataCollection[]) => {
  const schemaCount: Record<string, number> = {};
  let selectedSchema = "";

  if (!metadata.length) return DEFAULT_CIP25_SCHEMA;

  metadata.forEach((m) => {
    // Get Schema Type
    const meta = { assetName: m.assetName, metadata: m.metadata };
    const struture = getObjectStructureWithTypes(meta);
    const structureStringify = JSON.stringify(struture);

    // Count
    if (!schemaCount[structureStringify]) schemaCount[structureStringify] = 0;
    schemaCount[structureStringify]++;
    // Select first schema has default key
    if (!selectedSchema.length) selectedSchema = structureStringify;
  });

  // Select the highest schema count
  Object.keys(schemaCount).map((key) => {
    if (schemaCount[key]! > schemaCount[selectedSchema]!) selectedSchema = key;
  });

  return JSON.parse(selectedSchema) as Structure;
};

import { z } from "zod";

// TODO - ZOD check the json format
const metadataSchema = z.record(z.string(), z.unknown());

export const jsonFileSchema = z.array(metadataSchema);

/**
 * CIP25 Files recommanded schema
 */
export const FilesSchema = z.object({
  src: z.string().optional(),
  mediaType: z.string().optional(),
  name: z.string().optional(),
});

/**
 * CIP25 Recommanded schema
 */
export const CIP25Schema = z
  .object({
    name: z.string(),
    image: z.union([z.string(), z.array(z.string())]),
    description: z.string().optional(),
    mediaType: z.string().optional(),
    files: z.array(FilesSchema).optional(),
  })
  .catchall(z.unknown());

export const JSONSchema = z.array(
  z.object({
    assetName: z.string(),
    metadata: CIP25Schema,
  }),
);

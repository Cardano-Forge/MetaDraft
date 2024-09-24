import { z } from "zod";

const StatusEnum = z.enum(["success", "warning", "error"]);

/**
 * CIP25 Files recommanded schema
 */
export const FilesSchema = z.object({
  src: z.union([z.string(), z.array(z.string())]).optional(),
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

/**
 * Format required for the metadata.json file
 */
export const JSONSchema = z.array(
  z.object({
    assetName: z.string(),
    metadata: CIP25Schema,
  }),
);

export const MetadataCollectionSchema = z.object({
  id: z.string(),
  assetName: z.string(),
  metadata: CIP25Schema,
  status: StatusEnum,
});

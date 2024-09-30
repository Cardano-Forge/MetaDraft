import { z } from "zod";

const StatusEnum = z.enum(["success", "warning", "error"]);

/**
 * CIP25 Files recommanded schema
 */
export const FilesSchema = z.object({
  src: z.union([z.string().max(64), z.array(z.string().max(64))]).optional(),
  mediaType: z.string().max(64).optional(),
  name: z.string().max(64).optional(),
});

/**
 * CIP25 Recommanded schema
 */
export const CIP25Schema = z
  .object({
    name: z.string().max(64),
    image: z.union([z.string().max(64), z.array(z.string().max(64))]),
    description: z
      .union([z.string().max(64), z.array(z.string().max(64))])
      .optional(),
    mediaType: z.string().max(64).optional(),
    files: z.array(FilesSchema).optional(),
  })
  .catchall(z.unknown());

/**
 * Format required for the metadata.json file
 */
export const JSONSchema = z.array(
  z.object({
    assetName: z.string().max(64),
    metadata: CIP25Schema,
  }),
);

export const MetadataCollectionSchema = z.object({
  id: z.string().max(64),
  assetName: z.string().max(64),
  metadata: CIP25Schema,
  status: StatusEnum,
});

export const MetadataCollectionSchemaV2 = z.object({
  assetName: z.string().max(64),
  metadata: CIP25Schema,
});

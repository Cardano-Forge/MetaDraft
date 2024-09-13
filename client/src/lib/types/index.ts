import type { z } from "zod";
import type { CIP25Schema, FilesSchema, JSONSchema } from "../zod-schemas";
import { type StateOutput } from "@ada-anvil/metadraft-validator";

/**
 * Asset possible status
 */
export type Status = "success" | "warning" | "error";
/**
 * File's CIP25 recommanded type
 */
export type Files = z.infer<typeof FilesSchema>;
/**
 * CIP25 recommanded type only name and image are required
 */
export type CIP25 = z.infer<typeof CIP25Schema>;
/**
 * Metadata format wanted
 */
export type MetatdataJSON = z.infer<typeof JSONSchema>;

/**
 * Validator results for NFTs
 */
export type ValidatorResults = Record<string, StateOutput>;

/**
 * Metadata Structure
 * 
 * @example
 * {
 *  name: string,
 *  image: string,
 *  files: array,
 *  files[0]: {
 *      src: string,
 *      mediaType: string,
 *  },
 *  attributes: "object",
 *  attributes.Background: "string",
 *  attributes.Body Color: "string",
 *  ...
 * }
 */
export type Structure = {
  [key: string]: string | Structure;
};

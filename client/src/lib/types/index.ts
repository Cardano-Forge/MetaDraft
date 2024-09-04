import type { z } from "zod";
import type { CIP25Schema, FilesSchema, JSONSchema } from "../zod-schemas";

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
 * Error message
 */
// TODO - better message type
export type ErrorMessage = {
  validatorId: string;
  message: unknown;
};

/**
 * Validator result for an NFT
 */
export type ValidatorResult = {
  status: Status;
  warnings?: ErrorMessage[];
  errors?: ErrorMessage[];
};

/**
 * Validator results for NFTs
 */
export type ValidatorResults = Record<string, ValidatorResult>;

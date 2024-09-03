import { z } from "zod";

// TODO - ZOD check the json format
const metadataSchema = z.record(z.string(), z.unknown());

export const jsonFileSchema = z.array(metadataSchema);
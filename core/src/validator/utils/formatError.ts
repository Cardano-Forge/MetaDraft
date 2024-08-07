import { ZodError } from "npm:zod";
import type { FormattedError } from "./types.ts";

/**
 * Wrapper function around zod flatten function.
 * Requires to include the custom "status" parameter.
 */
export function formatError(
  error: ZodError | undefined,
): FormattedError | undefined {
  if (!error) return undefined;
  return error.flatten((issue: any) => ({
    message: issue.message,
    errorCode: issue.code,
    status: issue.params?.status || "error",
    path: issue.path.join("/"),
  })) as FormattedError;
}

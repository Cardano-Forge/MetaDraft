import type { ZodError, ZodIssue } from "zod";
import type { FormattedError } from "./types.ts";

/**
 * Formats a Zod error into a structured `FormattedError` object.
 * If no error is provided, it returns `undefined`.
 * @category Utils
 * @param {ZodError | undefined} error - The Zod validation error to format. If `undefined`, the function will return `undefined`.
 * @return {FormattedError | undefined} A formatted error object containing `message`, `errorCode`, `status`, and `path` properties.
 */
export function formatError(
  error: ZodError | undefined,
): FormattedError | undefined {
  if (!error) return undefined;
  return error.flatten(
    (issue: ZodIssue & { params?: { status?: string } }) => ({
      message: issue.message,
      errorCode: issue.code,
      status: issue.params?.status || "error",
      path: issue.path.join("/"),
    }),
  ) as FormattedError;
}

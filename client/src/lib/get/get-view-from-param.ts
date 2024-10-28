import { type ViewOptions } from "~/components/view-button";

export const getViewFromParams = (
  param: string | null,
  defaultValue?: ViewOptions,
): ViewOptions => {
  if (!param) return defaultValue ?? "table";
  if (param !== "table" && param !== "grid") return defaultValue ?? "table";
  return param;
};

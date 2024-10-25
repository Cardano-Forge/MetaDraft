import { type ViewOptions } from "~/components/view-button";

export const getViewFromParams = (param: string | null): ViewOptions => {
  if (!param) return "table";
  if (param !== "table" && param !== "grid") return "table";
  return param;
};

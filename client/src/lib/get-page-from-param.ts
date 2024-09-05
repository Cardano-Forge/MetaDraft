import { bind } from "./bind-number";

export const getPageFromParams = (param: string | null, max: number) => {
  if (!param) return 1;
  if (isNaN(+param)) return 1;
  return bind(1, max, +param);
};

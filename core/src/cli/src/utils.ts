import { DIVIDER } from "./contstant.ts";

export function extractOptions(validator: string) {
  const options: string | undefined = validator.split(DIVIDER)[1];
  if (options && options.length > 0) {
    return JSON.parse(options);
  }
  return {};
}

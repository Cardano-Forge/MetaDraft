import { groupBy } from "lodash";

export const a: string = "a";

export const test = () => {
  return groupBy(
    [
      { a: 1, b: 2 },
      { a: 1, b: 3 },
      { a: 2, b: 4 },
    ],
    "a"
  );
};

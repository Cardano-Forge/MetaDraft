import type { ValidationsCollection } from "../types";

export const getKeyCount = (validations: ValidationsCollection[]) => {
  const keys: Record<
    "warnings" | "errors",
    Record<string, { count: number; message: string }>
  > = {
    warnings: {},
    errors: {},
  };
  if (!validations) return keys;
  validations.forEach(({ validation }) => {
    if (validation.status !== "success") {
      // WARNINGS
      validation.warnings.forEach(({ validatorId, message }) => {
        if (keys.warnings[validatorId]) {
          keys.warnings[validatorId].count++;
        } else {
          keys.warnings[validatorId] = {
            count: 1,
            message: getMessage(message),
          };
        }
      });
      // ERRORS
      validation.errors.forEach(({ validatorId, message }) => {
        if (keys.errors[validatorId]) {
          keys.errors[validatorId].count++;
        } else {
          keys.errors[validatorId] = {
            count: 1,
            message: getMessage(message),
          };
        }
      });
    }
  });
  return keys;
};

type Temp = { message: string };

const getMessage = (msg: unknown) => {
  if (!msg) return "";
  if (typeof msg === "string") return msg;
  if ((msg as Temp).message) return (msg as Temp).message;
  return "";
};

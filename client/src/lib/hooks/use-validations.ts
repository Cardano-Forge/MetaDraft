import { useRxData } from "rxdb-hooks";

import useAssetState from "./use-asset-state";

import type { ValidatorResults } from "../types";
import type { MetadataValidations } from "../db/types";

export const useValidations = () => {
  const { status } = useAssetState();
  const { result, isFetching } = useRxData<MetadataValidations>(
    "validations",
    (collection) => collection.findByIds(["validations"]),
  );

  const validations = result[0]?.validations;

  const getWarnings = () => {
    const warnings: ValidatorResults[] = [];
    if (!validations || !status) return [];
    Object.keys(status).map((key) => {
      if (status[key] !== "success" && !!validations[key]?.warnings.length) {
        warnings.push({ [key]: validations[key] });
      }
    });
    return warnings;
  };

  const getErrors = () => {
    const errors: ValidatorResults[] = [];
    if (!validations || !status) return [];
    Object.keys(status).map((key) => {
      if (status[key] !== "success" && !!validations[key]?.errors.length) {
        errors.push({ [key]: validations[key] });
      }
    });
    return errors;
  };

  const getKeyCount = () => {
    const keys: Record<
      "warnings" | "errors",
      Record<string, { count: number; message: string }>
    > = {
      warnings: {},
      errors: {},
    };
    if (!validations || !status) return keys;
    Object.keys(status).map((key) => {
      if (status[key] !== "success") {
        // WARNINGS
        validations[key]?.warnings.forEach(({ validatorId, message }) => {
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
        validations[key]?.errors.forEach(({ validatorId, message }) => {
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

  return { validations, isFetching, getKeyCount, getWarnings, getErrors };
};

const getMessage = (msg: unknown) => {
  if (!msg) return "";
  if (typeof msg === "string") return msg;
  if (msg.message && typeof msg.message === "string")
    return msg.message as string;
  return "";
};

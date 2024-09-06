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
    const keys: Record<"warnings" | "errors", Record<string, number>> = {
      warnings: {},
      errors: {},
    };
    if (!validations || !status) return keys;
    Object.keys(status).map((key) => {
      if (status[key] !== "success") {
        // WARNINGS
        validations[key]?.warnings.forEach(({ validatorId }) => {
          if (keys.warnings[validatorId]) {
            keys.warnings[validatorId]++;
          } else {
            keys.warnings[validatorId] = 1;
          }
        });
        // ERRORS
        validations[key]?.errors.forEach(({ validatorId }) => {
          if (keys.errors[validatorId]) {
            keys.errors[validatorId]++;
          } else {
            keys.errors[validatorId] = 1;
          }
        });
      }
    });
    return keys;
  };

  return { validations, isFetching, getKeyCount, getWarnings, getErrors };
};

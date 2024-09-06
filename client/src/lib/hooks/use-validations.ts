import { useRxData } from "rxdb-hooks";
import type { MetadataValidations } from "../db/types";

export const useValidations = () => {
  const { result, isFetching } = useRxData<MetadataValidations>(
    "validations",
    (collection) => collection.findByIds(["validations"]),
  );

  const validations = result[0]?.validations;

  const getWarnings = (assetName: string) => {
    if (!validations) return;
    const assetValidation = validations[assetName];
    if (!assetValidation) return;
    if (assetValidation.status !== "warning") return;
    return validations[assetName]?.warnings;
  };

  const getErrors = (assetName: string) => {
    if (!validations) return;
    const assetValidation = validations[assetName];
    if (!assetValidation) return;
    if (assetValidation.status !== "error") return;
    return validations[assetName]?.errors;
  };

  const getKeyCount = () => {
    const keys: Record<"warnings" | "errors", Record<string, number>> = {
      warnings: {},
      errors: {},
    };
    if (!validations) return keys;
    Object.keys(validations).map((key) => {
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
    });
    return keys;
  };

  return { validations, isFetching, getKeyCount, getWarnings, getErrors };
};

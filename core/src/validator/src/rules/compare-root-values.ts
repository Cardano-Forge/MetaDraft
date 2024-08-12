import { BaseValidator } from "../core.ts";

import { getStates } from "../utils/getState.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import type { Result } from "../utils/types.ts";

import { distance, closest } from "fastest-levenshtein";

/**
 * A validator that checks if root value strings in metadata are too similar to each other based on a Levenshtein distance threshold.
 */
export class CompareRootValues extends BaseValidator {
  private threshold = 2;

  constructor() {
    const id = "compare-root-values";
    super(id);
  }

  async Execute(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Promise<Result[]> {
    console.debug(`Executing ${this.id} with: `, metadata);
    return this.Logic(asset_name, metadata, _metadatas);
  }

  Logic(
    asset_name: string,
    metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    const isInvalid = metadataValidator(asset_name, metadata, this.id);
    if (isInvalid) return isInvalid;

    let warnings: string[] = [];

    let similarValuesDetected = false;

    const values = Object.values(metadata as object);
    // console.debug(
    //   "Values",
    //   values,
    //   values.filter((valueToCheck) => typeof valueToCheck === "string"),
    // );

    const stringValues = values.filter(
      (valueToCheck) => typeof valueToCheck === "string",
    );

    for (const value of stringValues) {
      // console.debug(
      //   "QUE PASA",
      //   value,
      //   stringValues.filter((valueToCheck) => valueToCheck !== value),
      // );
      const closestValue = closest(
        value,
        stringValues.filter((valueToCheck) => valueToCheck !== value),
      );
      // console.debug("Closest Value", closestValue);

      const distanceValue = distance(value, closestValue);
      // console.debug("Distance Value", distanceValue);

      if (distanceValue < this.threshold) {
        // console.log(
        //   "Warning detected for",
        //   value,
        //   closestValue,
        //   "with",
        //   distanceValue,
        // );
        warnings.push(`${value} is similar to ${closestValue}`);
      }
    }

    if (warnings.length > 0) {
      similarValuesDetected = true;
    }

    return getStates(
      {
        state: similarValuesDetected ? "warning" : "success",
        message: warnings,
      },
      "No similar values found.",
      asset_name,
      metadata,
      this.id,
    );
  }
}

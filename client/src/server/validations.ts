"use server";

import {
  type IValidator,
  Validator,
  mapping,
} from "@ada-anvil/metadraft-validator";
import type {
  MetadataCollection,
  RulesCollection,
  ValidatorResults,
} from "~/lib/types";
/**
 * Validates an array of metadata collections using a series of predefined validators.
 *
 * The function executes a set of validators to check the validity of metadata objects.
 * Each validator is applied to the metadata collections, and the results are collected
 * and returned after processing all the metadata.
 *
 * @param {MetadataCollection[]} metadata - An array of metadata collections to be validated.
 *   Each item should include properties relevant for validation, such as `assetName` and `metadata`.
 * @param {RulesCollection} rules - { id: <string>, rules:<string>[] }
 *  rules is a rule name array to use for validation
 * @returns {Promise<ValidatorResults>} - A promise that resolves to the validation results.
 *   The results include information about any validation errors or warnings for each metadata item.
 *
 * @example
 * const metadata = [
 *   { assetName: "NFT1", metadata: { name: "Token1", type: "image" } },
 *   { assetName: "NFT2", metadata: { name: "Token2", type: "video" } }
 * ];
 *
 * validateMetadata(metadata).then((results) => {
 *   console.log(results);
 *   // Output will include validation results, such as errors or warnings for each metadata item.
 * });
 */
export async function validateMetadata(
  metadata: MetadataCollection[],
  rules: RulesCollection,
): Promise<ValidatorResults> {
  console.time(`timeToValidate`);
  console.log("where am i ?");

  const template: IValidator[] = [];

  for (const validator of rules.rules) {
    if (mapping[validator]) {
      template.push(new mapping[validator]());
    } else {
      console.warn(
        `Warning: Validator ${validator} is not found in the mapping object.`,
      );
    }
  }
  console.log("after validator template");

  const mainValidator = new Validator("Main");
  for (const validator of template) {
    mainValidator.Enable(validator);
  }
  console.log("after main validator");

  for (const asset of metadata) {
    // console.log(asset);
    mainValidator.Execute(asset.assetName, asset.metadata, metadata);
  }
  // todo - doesnt go here ?
  console.log("after execute");

  mainValidator.ExecuteOnce(metadata);

  console.log("after execute once");

  const result = mainValidator.GetResults();

  console.log("result");

  console.timeEnd(`timeToValidate`);

  return result;
}

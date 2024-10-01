"use server";

import {
  type IValidator,
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateKeys,
  HasRequiredKeys,
  KeyFiles,
  KeyImage,
  KeyLength,
  KeyMediaType,
  KeyName,
  Validator,
  DuplicateNameAndImage,
  KeyAnvilCase,
  mapping,
} from "@ada-anvil/metadraft-validator";
import { ruleSet } from "~/lib/constant";
import { RulesId } from "~/lib/rules";
import type { MetadataCollection, ValidatorResults } from "~/lib/types";

/**
 * Validates an array of metadata collections using a series of predefined validators.
 *
 * The function executes a set of validators to check the validity of metadata objects.
 * Each validator is applied to the metadata collections, and the results are collected
 * and returned after processing all the metadata.
 *
 * @param {MetadataCollection[]} metadata - An array of metadata collections to be validated.
 *   Each item should include properties relevant for validation, such as `assetName` and `metadata`.
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
): Promise<ValidatorResults> {
  console.time(`timeToValidate`);

  const template: IValidator[] = [];
  for (const validator of ruleSet) {
    template.push(new mapping[validator]());
  }

  const mainValidator = new Validator("Main");
  for (const validator of template) {
    mainValidator.Enable(validator);
  }

  for (const asset of metadata) {
    mainValidator.Execute(asset.assetName, asset.metadata, metadata);
  }

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  console.timeEnd(`timeToValidate`);

  return result;
}

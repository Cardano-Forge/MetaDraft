"use server";

import {
  type IValidator,
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateKeysValidator,
  HasRequiredKeysValidator,
  KeyFilesValidator,
  KeyImageValidator,
  KeyLength,
  KeyMediaTypeValidator,
  KeyNameValidator,
  Validator,
  DuplicateNameAndImage,
  KeyAnvilCasing,
} from "@ada-anvil/metadraft-validator";
import type { MetatdataJSON, ValidatorResults } from "~/lib/types";

export async function validateMetadata(
  metadata: MetatdataJSON,
): Promise<ValidatorResults> {
  console.time(`timeToValidate`);

  const template: IValidator[] = [
    new HasRequiredKeysValidator(),
    new CompareRootKeys(),
    new CompareRootValues(),
    new KeyNameValidator(),
    new KeyLength(),
    new KeyMediaTypeValidator(),
    new KeyImageValidator(),
    new KeyFilesValidator(),
    new DuplicateKeysValidator(),
    new CompareAttributesKeys(),
    new DuplicateNameAndImage(),
    new KeyAnvilCasing(),
  ];

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

"use server";

import {
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateAssetName,
  DuplicateImage,
  DuplicateKeysValidator,
  HasRequiredKeysValidator,
  IValidator,
  KeyAlphanumeric,
  KeyCamelCase,
  KeyFilesValidator,
  KeyImageValidator,
  KeyLength,
  KeyMediaTypeValidator,
  KeyNameValidator,
  KeyTitleCase,
  KeyWhiteSpace,
  Validator,
  mapping,
} from "@ada-anvil/metadraft-validator";

export async function doStuff(metadata: object[]) {
  console.time(`timeToValidate`);

  const template: IValidator[] = [
    new HasRequiredKeysValidator(),
    new CompareRootKeys(),
    new CompareRootValues(),
    new KeyCamelCase(),
    new KeyTitleCase(),
    new KeyWhiteSpace(),
    new KeyNameValidator(),
    new KeyLength(),
    new KeyMediaTypeValidator(),
    new KeyImageValidator(),
    new KeyFilesValidator(),
    new KeyAlphanumeric(),
    new DuplicateImage(),
    new DuplicateAssetName(),
    new DuplicateKeysValidator(),
    new CompareAttributesKeys(),
  ];

  const mainValidator = new Validator("Main");
  for (const validator of template) {
    mainValidator.Enable(validator);
  }

  for (const asset of metadata) {
    mainValidator.Execute((asset as { name: string }).name, asset, metadata);
  }

  const result = mainValidator.GetResults();

  console.timeEnd(`timeToValidate`);

  return JSON.stringify(result, null, 2);
}

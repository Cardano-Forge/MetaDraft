"use server";

import {
  type IValidator,
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateKeysValidator,
  HasRequiredKeysValidator,
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
  DuplicateNameAndImage,
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
    new DuplicateKeysValidator(),
    new CompareAttributesKeys(),
    new DuplicateNameAndImage(),
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

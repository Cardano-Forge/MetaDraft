import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import metadata from "./do_not_commit.json" with { type: "json" };

import {
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateKeysValidator,
  DuplicateNameAndImage,
  HasRequiredKeysValidator,
  KeyAnvilCasing,
  KeyFilesValidator,
  KeyImageValidator,
  KeyLength,
  KeyMediaTypeValidator,
  KeyNameValidator,
  type IValidator,
} from "../src/mod.ts";

Deno.test("Metadata - withSuccess", () => {
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

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  console.log(result)

  assertEquals(result, {});
});

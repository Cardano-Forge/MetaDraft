import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import metadata from "./do_not_commit.json" with { type: "json" };

import {
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateKeys,
  DuplicateNameAndImage,
  HasRequiredKeys,
  KeyAnvilCase,
  KeyFiles,
  KeyImage,
  KeyLength,
  KeyMediaType,
  KeyName,
  type IValidator,
} from "../src/mod.ts";

Deno.test("Metadata - withSuccess", () => {
  const template: IValidator[] = [
    new HasRequiredKeys(),
    new CompareRootKeys(),
    new CompareRootValues(),
    new KeyName(),
    new KeyLength(),
    new KeyMediaType(),
    new KeyImage(),
    new KeyFiles(),
    new DuplicateKeys(),
    new CompareAttributesKeys(),
    new DuplicateNameAndImage(),
    new KeyAnvilCase(),
  ];
  console.time("timeAll");
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
  console.timeEnd("timeAll");

  assertEquals(result, {});
});

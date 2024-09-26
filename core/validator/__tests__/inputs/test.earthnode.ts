import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import {
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateImage,
  DuplicateKeysValidator,
  DuplicateName,
  HasRequiredKeysValidator,
  KeyAlphanumeric,
  KeyAttributesValidator,
  KeyDescriptionValidator,
  KeyFilesValidator,
  KeyImageValidator,
  KeyLength,
  KeyLowerCase,
  KeyMediaTypeValidator,
  KeyMediaValidator,
  KeyNameValidator,
  KeyTraitsValidator,
  KeyWhiteSpace,
  Validator,
} from "../../src/mod.ts";

Deno.test("TestEarthnode", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "earthnode.json"), "utf8")
    ),
  ];

  const validatorsReceivedFromFrontend = [
    new HasRequiredKeysValidator(),
    new CompareRootKeys(),
    new CompareRootValues(),
    new KeyLowerCase(),
    new KeyAttributesValidator(),
    new CompareAttributesKeys(),
    new KeyWhiteSpace(),
    new KeyNameValidator(),
    new KeyLength(),
    new KeyMediaTypeValidator(),
    new KeyMediaValidator(),
    new KeyImageValidator(),
    new KeyFilesValidator(),
    new KeyDescriptionValidator(),
    new KeyAlphanumeric(),
    new DuplicateImage(),
    new DuplicateName(),
    new DuplicateKeysValidator(),
    new KeyTraitsValidator(),
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(validator);
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      Object.values(asset_metadata)[0],
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["EarthNode976"].status, "warning");
  assertEquals(result["EarthNode976"].warnings.length, 2);
  assertEquals(
    result["EarthNode976"].warnings[0].validatorId,
    "key-lower-case"
  );
  assertEquals(
    result["EarthNode976"].warnings[0].validationErrors[0].path,
    ["mediaType"]
  );

  assertEquals(
    result["EarthNode976"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["EarthNode976"].warnings[1].validationErrors[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
});

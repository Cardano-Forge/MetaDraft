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

Deno.test("TestCornucopias", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "cornucopias.json"), "utf8")
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

  assertEquals(result["CFN00538"].status, "warning");
  assertEquals(result["CFN00538"].warnings.length, 2);
  assertEquals(result["CFN00538"].warnings[0].validatorId, "key-lower-case");

  assertEquals(result["CFN00538"].warnings[0].validationError.length, 7);
  assertEquals(result["CFN00538"].warnings[0].validationError[0].path, [
    "media",
    "Website",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[1].path, [
    "media",
    "Link Tree",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[2].path, [
    "fullName",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[3].path, [
    "mediaType",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[4].path, [
    "typeClass",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[5].path, [
    "attributes",
    "NodeType",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationError[6].path, [
    "projectName",
  ]);

  assertEquals(result["CFN00538"].warnings[1].validatorId, "key-alphanumeric");
  assertEquals(result["CFN00538"].warnings[1].validationError[0].path, [
    "media",
    "Link Tree",
  ]);
});

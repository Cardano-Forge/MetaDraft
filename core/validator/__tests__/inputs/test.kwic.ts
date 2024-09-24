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

Deno.test("TestKwic", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "kwic.json"), "utf8")
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

  assertEquals(result["KWIC4479"].status, "warning");
  assertEquals(result["KWIC4479"].warnings.length, 3);
  assertEquals(result["KWIC4479"].warnings[0].validatorId, "key-lower-case");
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues.length, 9);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[0].path, [
    "Body",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[1].path, [
    "Head",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[2].path, [
    "Side",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[3].path, [
    "Bling",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[4].path, [
    "Faction",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[5].path, [
    "Background",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[6].path, [
    "Foreground",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[7].path, [
    "Back Attachment",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationError.issues[8].path, [
    "Head Attachment",
  ]);

  assertEquals(
    result["KWIC4479"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["KWIC4479"].warnings[1].validationError.issues[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );

  assertEquals(result["KWIC4479"].warnings[2].validatorId, "key-alphanumeric");
  assertEquals(result["KWIC4479"].warnings[2].validationError.issues[0].path, [
    "Back Attachment",
  ]);
  assertEquals(result["KWIC4479"].warnings[2].validationError.issues[1].path, [
    "Head Attachment",
  ]);
});

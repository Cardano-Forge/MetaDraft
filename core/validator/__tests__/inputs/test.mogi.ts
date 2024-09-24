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
import { KeyTitleCase } from "../../src/rules/key-title-case.ts";

Deno.test("TestMogi", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "mogi.json"), "utf8")
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
    new KeyTitleCase(),
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

  assertEquals(result["Mogi655"].status, "warning");
  assertEquals(result["Mogi655"].warnings.length, 3);
  assertEquals(result["Mogi655"].warnings[0].validatorId, "key-lower-case");
  assertEquals(result["Mogi655"].warnings[0].validationError.issues.length, 10);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[0].path, [
    "Bg",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[1].path, [
    "Fur",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[2].path, [
    "Hat",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[3].path, [
    "Eyes",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[4].path, [
    "Mouth",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[5].path, [
    "Clothes",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[6].path, [
    "Discord",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[7].path, [
    "Twitter",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[8].path, [
    "Weather",
  ]);
  assertEquals(result["Mogi655"].warnings[0].validationError.issues[9].path, [
    "mediaType",
  ]);

  assertEquals(
    result["Mogi655"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["Mogi655"].warnings[1].validationError.issues[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
  assertEquals(result["Mogi655"].warnings[2].validatorId, "key-title-case");
  assertEquals(result["Mogi655"].warnings[2].validationError.issues.length, 4);
  assertEquals(result["Mogi655"].warnings[2].validationError.issues[0].path, [
    "name",
  ]);
  assertEquals(result["Mogi655"].warnings[2].validationError.issues[1].path, [
    "image",
  ]);
  assertEquals(result["Mogi655"].warnings[2].validationError.issues[2].path, [
    "mediaType",
  ]);
  assertEquals(result["Mogi655"].warnings[2].validationError.issues[3].path, [
    "description",
  ]);
});

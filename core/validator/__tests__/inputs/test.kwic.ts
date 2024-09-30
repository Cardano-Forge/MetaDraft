import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import {
  CompareAttributesKeys,
  CompareRootKeys,
  CompareRootValues,
  DuplicateImage,
  DuplicateKeys,
  DuplicateName,
  HasRequiredKeys,
  KeyAlphanumeric,
  KeyAttributes,
  KeyDescription,
  KeyFiles,
  KeyImage,
  KeyLength,
  KeyLowerCase,
  KeyMediaType,
  KeyMedia,
  KeyName,
  KeyTraits,
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
    new HasRequiredKeys(),
    new CompareRootKeys(),
    new CompareRootValues(),
    new KeyLowerCase(),
    new KeyAttributes(),
    new CompareAttributesKeys(),
    new KeyWhiteSpace(),
    new KeyName(),
    new KeyLength(),
    new KeyMediaType(),
    new KeyMedia(),
    new KeyImage(),
    new KeyFiles(),
    new KeyDescription(),
    new KeyAlphanumeric(),
    new DuplicateImage(),
    new DuplicateName(),
    new DuplicateKeys(),
    new KeyTraits(),
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
  assertEquals(result["KWIC4479"].warnings[0].validationErrors.length, 9);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[0].path, [
    "Body",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[1].path, [
    "Head",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[2].path, [
    "Side",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[3].path, [
    "Bling",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[4].path, [
    "Faction",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[5].path, [
    "Background",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[6].path, [
    "Foreground",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[7].path, [
    "Back Attachment",
  ]);
  assertEquals(result["KWIC4479"].warnings[0].validationErrors[8].path, [
    "Head Attachment",
  ]);

  assertEquals(
    result["KWIC4479"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["KWIC4479"].warnings[1].validationErrors[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );

  assertEquals(result["KWIC4479"].warnings[2].validatorId, "key-alphanumeric");
  assertEquals(result["KWIC4479"].warnings[2].validationErrors[0].path, [
    "Back Attachment",
  ]);
  assertEquals(result["KWIC4479"].warnings[2].validationErrors[1].path, [
    "Head Attachment",
  ]);
});

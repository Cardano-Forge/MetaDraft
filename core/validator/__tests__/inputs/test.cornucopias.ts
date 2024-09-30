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

Deno.test("TestCornucopias", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "cornucopias.json"), "utf8")
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

  assertEquals(result["CFN00538"].status, "warning");
  assertEquals(result["CFN00538"].warnings.length, 2);
  assertEquals(result["CFN00538"].warnings[0].validatorId, "key-lower-case");

  assertEquals(result["CFN00538"].warnings[0].validationErrors.length, 7);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[0].path, [
    "media",
    "Website",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[1].path, [
    "media",
    "Link Tree",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[2].path, [
    "fullName",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[3].path, [
    "mediaType",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[4].path, [
    "typeClass",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[5].path, [
    "attributes",
    "NodeType",
  ]);
  assertEquals(result["CFN00538"].warnings[0].validationErrors[6].path, [
    "projectName",
  ]);

  assertEquals(result["CFN00538"].warnings[1].validatorId, "key-alphanumeric");
  assertEquals(result["CFN00538"].warnings[1].validationErrors[0].path, [
    "media",
    "Link Tree",
  ]);
});

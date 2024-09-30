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

Deno.test("TestDeadpxlz", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "deadpxlz.json"), "utf8")
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

  assertEquals(result["PXL9951"].status, "warning");
  assertEquals(result["PXL9951"].warnings.length, 1);
  assertEquals(
    result["PXL9951"].warnings[0].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["PXL9951"].warnings[0].validationErrors[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
});

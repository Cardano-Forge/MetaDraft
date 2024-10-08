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

Deno.test("TestCetardio", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "cetardio.json"), "utf8")
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

  assertEquals(result["CETARDIOwhitelist4"].status, "warning");
  assertEquals(result["CETARDIOwhitelist4"].warnings.length, 2);
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validatorId,
    "key-lower-case"
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validationErrors.length,
    4
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validationErrors[0].path,
    ["Discord"]
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validationErrors[1].path,
    ["Twitter"]
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validationErrors[2].path,
    ["Website"]
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[0].validationErrors[3].path,
    ["mediaType"]
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["CETARDIOwhitelist4"].warnings[1].validationErrors[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
});

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

Deno.test("TestPavia", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "pavia.json"), "utf8")
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

  assertEquals(result["PaviaEstate676"].status, "warning");
  assertEquals(result["PaviaEstate676"].warnings.length, 3);
  assertEquals(
    result["PaviaEstate676"].warnings[0].validatorId,
    "key-lower-case"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors.length,
    5
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors[0].path,
    ["mediaType"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors[1].path,
    ["estateSize"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors[2].path,
    ["productInformation"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors[3].path,
    ["productInformation", "Pavia io"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationErrors[4].path,
    ["productInformation", "Copyright"]
  );

  assertEquals(
    result["PaviaEstate676"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[1].validationErrors[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validatorId,
    "key-alphanumeric"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validationErrors.length,
    1
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validationErrors[0].path,
    ["productInformation", "Pavia io"]
  );
});

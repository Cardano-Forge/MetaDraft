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

Deno.test("TestPavia", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "pavia.json"), "utf8")
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

  assertEquals(result["PaviaEstate676"].status, "warning");
  assertEquals(result["PaviaEstate676"].warnings.length, 3);
  assertEquals(
    result["PaviaEstate676"].warnings[0].validatorId,
    "key-lower-case"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError.length,
    5
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError[0].path,
    ["mediaType"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError[1].path,
    ["estateSize"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError[2].path,
    ["productInformation"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError[3].path,
    ["productInformation", "Pavia io"]
  );
  assertEquals(
    result["PaviaEstate676"].warnings[0].validationError[4].path,
    ["productInformation", "Copyright"]
  );

  assertEquals(
    result["PaviaEstate676"].warnings[1].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[1].validationError[0].message,
    "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set."
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validatorId,
    "key-alphanumeric"
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validationError.length,
    1
  );
  assertEquals(
    result["PaviaEstate676"].warnings[2].validationError[0].path,
    ["productInformation", "Pavia io"]
  );
});

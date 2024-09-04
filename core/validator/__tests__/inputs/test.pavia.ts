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
      readFileSync(join("__tests__", "payloads", "pavia.json"), "utf8"),
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
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    PaviaEstate676: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-lower-case",
          message: {
            message: "Some keys do not adhere to Lower Case formatting.",
            warnings: [
              { key: "mediaType", path: "mediaType" },
              { key: "estateSize", path: "estateSize" },
              { key: "productInformation", path: "productInformation" },
              { key: "Pavia io", path: "productInformation.Pavia io" },
              { key: "Copyright", path: "productInformation.Copyright" },
            ],
          },
        },
        {
          validatorId: "compare-attributes-keys",
          message: [
            "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set.",
          ],
        },
        {
          validatorId: "key-alphanumeric",
          message: {
            message:
              "Only alphanumeric characters, dashes, and underscores are allowed for the key.",
            warnings: [
              { key: "Pavia io", path: "productInformation.Pavia io" },
            ],
          },
        },
      ],
      errors: [],
    },
  });
});

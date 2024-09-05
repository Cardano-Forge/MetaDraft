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
      readFileSync(join("__tests__", "payloads", "kwic.json"), "utf8"),
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
    KWIC4479: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-lower-case",
          message: {
            message: "Some keys do not adhere to Lower Case formatting.",
            warnings: [
              { key: "Body", path: "Body" },
              { key: "Head", path: "Head" },
              { key: "Side", path: "Side" },
              { key: "Bling", path: "Bling" },
              { key: "Faction", path: "Faction" },
              { key: "Background", path: "Background" },
              { key: "Foreground", path: "Foreground" },
              { key: "Back Attachment", path: "Back Attachment" },
              { key: "Head Attachment", path: "Head Attachment" },
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
              { key: "Back Attachment", path: "Back Attachment" },
              { key: "Head Attachment", path: "Head Attachment" },
            ],
          },
        },
      ],
      errors: [],
    },
  });
});

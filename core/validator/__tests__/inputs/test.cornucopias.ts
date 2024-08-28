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

Deno.test("TestCornucopias", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "cornucopias.json"), "utf8"),
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
    CFN00538: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-lower-case",
          message: {
            message: "Some keys do not adhere to Lower Case formatting.",
            warnings: [
              { key: "Website", path: "media.Website" },
              { key: "Link Tree", path: "media.Link Tree" },
              { key: "fullName", path: "fullName" },
              { key: "mediaType", path: "mediaType" },
              { key: "typeClass", path: "typeClass" },
              { key: "NodeType", path: "attributes.NodeType" },
              { key: "projectName", path: "projectName" },
            ],
          },
        },
        {
          validatorId: "key-alphanumeric",
          message: {
            message:
              "Only alphanumeric characters, dashes, and underscores are allowed for the key.",
            warnings: [{ key: "Link Tree", path: "media.Link Tree" }],
          },
        },
      ],
    },
  });
});

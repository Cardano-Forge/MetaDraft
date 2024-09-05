// deno test -A test.fort-gotten.ts
import { assertEquals } from "@std/assert";
import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Validator } from "../src/core.ts";

import { KeyNameValidator } from "../src/rules/key-name.ts";
import { KeyImageValidator } from "../src/rules/key-image.ts";
import { KeyMediaTypeValidator } from "../src/rules/key-media-type.ts";
import { KeyDescriptionValidator } from "../src/rules/key-description.ts";
import { KeyFilesValidator } from "../src/rules/key-files.ts";
import { KeyAttributesValidator } from "../src/rules/key-attributes.ts";
import { KeyTraitsValidator } from "../src/rules/key-traits.ts";

const mapping = [
  new KeyNameValidator(),
  new KeyImageValidator(),
  new KeyMediaTypeValidator(),
  new KeyDescriptionValidator(),
  new KeyFilesValidator(),
  new KeyAttributesValidator(),
  new KeyTraitsValidator(),
];

Deno.test("fort-gotten.json", () => {
  const metadata = JSON.parse(
    readFileSync(join("__tests__", "payloads", "fort-gotten.json"), "utf8"),
  );

  const mainValidator = new Validator("Main");
  for (const validator of mapping) {
    mainValidator.Enable(validator);
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      Object.keys(
        asset_metadata["721"][
          "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b"
        ],
      )[0],
      Object.values(
        asset_metadata["721"][
          "48ef9fb80a0ad2fd9f3d5b981ef3bfac2bae84137523217b387a775b"
        ],
      )[0],
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    FortGottenEp02Kid3195: { status: "success", warnings: [], errors: [] },
    FortGottenEp02Kid3963: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-attributes",
          message: {
            formErrors: [],
            fieldErrors: {
              attributes: [
                {
                  message: "It is recommended to use string instead of number",
                  errorCode: "custom",
                  status: "warning",
                  path: "attributes/Head",
                },
              ],
            },
          },
        },
        {
          validatorId: "key-traits",
          message: {
            formErrors: [],
            fieldErrors: {
              traits: [
                {
                  message:
                    "All elements in the array should be of the same type.",
                  errorCode: "custom",
                  status: "warning",
                  path: "traits",
                },
                {
                  message: "It is recommended to use string instead of number",
                  errorCode: "custom",
                  status: "warning",
                  path: "traits/1",
                },
              ],
            },
          },
        },
      ],
      errors: [],
    },
  });
});

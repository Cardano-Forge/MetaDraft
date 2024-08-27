import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyAttributesValidator } from "../src/rules/key-attributes.ts";

Deno.test("KeyAttributesValidator - withWarning", () => {
  const metadata = [
    {
      attributes: {
        foo: "bar",
        number_field: 1,
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyAttributesValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    NO_ASSET_NAME_PROVIDED: {
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
                  path: "attributes/number_field",
                },
              ],
            },
          },
        },
      ],
    },
  });
});

Deno.test("KeyAttributesValidator - withSuccess", () => {
  const metadata = [
    {
      attributes: {
        foo: "bar",
        number_field: "1",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyAttributesValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    NO_ASSET_NAME_PROVIDED: { status: "success", warnings: [] },
  });
});

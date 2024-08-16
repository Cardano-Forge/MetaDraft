import { assertEquals } from "@std/assert";

import { Decorator } from "../src/core.ts";

import { KeyAttributesValidator } from "../src/rules/key-attributes.ts";

const mapping = {
  KeyAttributesValidator: KeyAttributesValidator,
} as const;

Deno.test("KeyAttributesValidator - withWarning", async () => {
  const metadata = [
    {
      attributes: {
        foo: "bar",
        number_field: 1,
      },
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyAttributesValidator",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  console.debug(JSON.stringify(result, null, 2));
  assertEquals(result, [
    {
      state: "warning",
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
      input: metadata[0],
      output: undefined,
      assetName: "NO_ASSET_NAME_PROVIDED",
      validatorId: "key-attributes",
    },
  ]);
});

Deno.test("KeyAttributesValidator - withSuccess", async () => {
  const metadata = [
    {
      attributes: {
        foo: "bar",
        number_field: "1",
      },
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyAttributesValidator",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      "NO_ASSET_NAME_PROVIDED",
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "`attributes` field is valid.",
      input: {
        attributes: {
          foo: "bar",
          number_field: "1",
        },
      },
      output: metadata[0],
      assetName: "NO_ASSET_NAME_PROVIDED",
      validatorId: "key-attributes",
    },
  ]);
});

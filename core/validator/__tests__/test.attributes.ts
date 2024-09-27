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

  assertEquals(result["NO_ASSET_NAME_PROVIDED"].status, "warning");
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validatorId,
    "key-attributes"
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[0].message,
    "It is recommended to use string instead of number"
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[0].path,
    ["attributes", "number_field"]
  );
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

  assertEquals(result, {});
});

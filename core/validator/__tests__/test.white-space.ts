import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyWhiteSpace } from "../src/rules/key-white-space.ts";

Deno.test("KeyWhiteSpace - withWarning", () => {
  const metadata = [
    {
      attributes: {
        foo: "bar ", // should warns for value
        number_field: 1,
        nested: {
          bar: " foo", // should warns for value
          one: "or",
          " two": "maybe", // should warns for key
          three: "who knows    ", // should warns for value
        },
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyWhiteSpace());

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result["NO_ASSET_NAME_PROVIDED"].status, "warning");
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validatorId,
    "key-white-space"
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors.length,
    4
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[0].path,
    ["attributes", "foo"]
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[1].path,
    ["attributes", "nested", "bar"]
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[2].path,
    ["attributes", "nested", " two"]
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[3].path,
    ["attributes", "nested", "three"]
  );
});

Deno.test("KeyWhiteSpace - withArrayAndWarning", () => {
  const metadata = [
    {
      attributes: {
        foo: "bar ",
        number_field: 1,
        nested: {
          arr: ["arrghhh", "arrrrggggghhhhh  "],
        },
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyWhiteSpace());

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result["NO_ASSET_NAME_PROVIDED"].status, "warning");
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validatorId,
    "key-white-space"
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors.length,
    2
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[0].path,
    ["attributes", "foo"]
  );
  assertEquals(
    result["NO_ASSET_NAME_PROVIDED"].warnings[0].validationErrors[1].path,
    ["attributes", "nested", "arr", 1]
  );
});

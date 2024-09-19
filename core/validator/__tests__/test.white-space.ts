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

  assertEquals(result, {
    NO_ASSET_NAME_PROVIDED: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-white-space",
          message: {
            message: "Trailing whitespaces found in the JSON object.",
            warnings: [
              { path: ["attributes", "foo"], whitespaceLocation: "value" },
              {
                path: ["attributes", "nested", "bar"],
                whitespaceLocation: "value",
              },
              {
                path: ["attributes", "nested", " two"],
                whitespaceLocation: "key",
              },
              {
                path: ["attributes", "nested", "three"],
                whitespaceLocation: "value",
              },
            ],
          },
        },
      ],
      errors: [],
    },
  });
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
        "test ": "key fail",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyWhiteSpace());

  for (const asset_metadata of metadata) {
    mainValidator.Execute("NO_ASSET_NAME_PROVIDED", asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    NO_ASSET_NAME_PROVIDED: {
      status: "warning",
      warnings: [
        {
          validatorId: "key-white-space",
          message: {
            message: "Trailing whitespaces found in the JSON object.",
            warnings: [
              { path: ["attributes", "foo"], whitespaceLocation: "value" },
              {
                path: ["attributes", "nested", "arr", "[1]"],
                whitespaceLocation: "value",
              },
            ],
          },
        },
      ],
      errors: [],
    },
  });
});

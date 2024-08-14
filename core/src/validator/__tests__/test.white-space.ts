import { assertEquals } from "@std/assert";

import { Decorator } from "../src/core.ts";

import { KeyWhiteSpace } from "../src/rules/key-white-space.ts";

const mapping = {
  KeyWhiteSpace: KeyWhiteSpace,
} as const;

Deno.test("KeyWhiteSpace - withWarning", async () => {
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

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyWhiteSpace",
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

  // console.debug(JSON.stringify(result, null, 2));
  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Trailing whitespaces found in the JSON object.",
        warnings: [
          {
            path: ["attributes", "foo"],
            whitespaceLocation: "value",
          },
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
      input: metadata[0],
      asset_name: "NO_ASSET_NAME_PROVIDED",
      validator_id: "key-white-space",
      output: undefined,
    },
  ]);
});

Deno.test("KeyWhiteSpace - withArrayAndWarning", async () => {
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

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyWhiteSpace",
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

  // console.debug(JSON.stringify(result, null, 2));
  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Trailing whitespaces found in the JSON object.",
        warnings: [
          {
            path: ["attributes", "foo"],
            whitespaceLocation: "value",
          },
          {
            path: ["attributes", "nested", "arr", "[1]"],
            whitespaceLocation: "value",
          },
        ],
      },
      input: metadata[0],
      asset_name: "NO_ASSET_NAME_PROVIDED",
      validator_id: "key-white-space",
      output: undefined,
    },
  ]);
});

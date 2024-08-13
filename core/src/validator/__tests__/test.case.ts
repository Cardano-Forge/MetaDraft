import { assertEquals } from "@std/assert";

import { Decorator } from "../src/core.ts";

import { KeyTitleCase } from "../src/rules/key-title-case.ts";
import { KeyCamelCase } from "../src/rules/key-camel-case.ts";
import { KeyLowerCase } from "../src/rules/key-lower-case.ts";
import { KeyUpperCase } from "../src/rules/key-upper-case.ts";
import { KeySnakeCase } from "../src/rules/key-snake-case.ts";

const mapping = {
  KeyTitleCase: KeyTitleCase,
  KeyCamelCase: KeyCamelCase,
  KeyLowerCase: KeyLowerCase,
  KeyUpperCase: KeyUpperCase,
  KeySnakeCase: KeySnakeCase,
} as const;

const metadata = [
  {
    policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
    asset_name: "asset000",
    name: "asset000",
    image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
    mediaType: "image/png",
    description:
      "a non empty description using a random length because Im testing", // 64 chars
    files: [
      {
        name: "oops",
        mediaType: "image/png",
        src: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
      },
    ],
    attributes: {
      foo: "bar",
    },
    traits: ["trait-1", { name: "trait-2", value: "2" }, 1],
  },
];

Deno.test("KeyTitleCase - withWarning", async () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyTitleCase",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  // console.debug(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Title Case formatting.",
        warnings: [
          { key: "policy_id", path: "policy_id" },
          { key: "asset_name", path: "asset_name" },
          { key: "name", path: "name" },
          { key: "image", path: "image" },
          { key: "mediaType", path: "mediaType" },
          { key: "description", path: "description" },
          { key: "files", path: "files" },
          { key: "attributes", path: "attributes" },
          { key: "foo", path: "attributes.foo" },
          { key: "traits", path: "traits" },
        ],
      },
      input: metadata[0],
      asset_name: "asset000",
      validator_id: "key-title-case",
      output: undefined,
    },
  ]);
});

Deno.test("KeyCamelCase - withWarning", async () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyCamelCase",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  // console.debug(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Camel Case formatting.",
        warnings: [
          { key: "policy_id", path: "policy_id" },
          { key: "asset_name", path: "asset_name" },
        ],
      },
      input: metadata[0],
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-camel-case",
    },
  ]);
});

Deno.test("KeySnakeCase - withWarning", async () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeySnakeCase",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  // console.debug(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Snake Case formatting.",
        warnings: [{ key: "mediaType", path: "mediaType" }],
      },
      input: metadata[0],
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-snake-case",
    },
  ]);
});

Deno.test("KeyLowerCase - withWarning", async () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyLowerCase",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  console.debug(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Lower Case formatting.",
        warnings: [{ key: "mediaType", path: "mediaType" }],
      },
      input: metadata[0],
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-lower-case",
    },
  ]);
});

Deno.test("KeyUpperCase - withWarning", async () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyUpperCase",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  // console.debug(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Upper Case formatting.",
        warnings: [
          { key: "policy_id", path: "policy_id" },
          { key: "asset_name", path: "asset_name" },
          { key: "name", path: "name" },
          { key: "image", path: "image" },
          { key: "mediaType", path: "mediaType" },
          { key: "description", path: "description" },
          { key: "files", path: "files" },
          { key: "attributes", path: "attributes" },
          { key: "foo", path: "attributes.foo" },
          { key: "traits", path: "traits" },
        ],
      },
      input: metadata[0],
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-upper-case",
    },
  ]);
});

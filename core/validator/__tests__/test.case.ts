import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

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
    policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
    assetName: "asset000",
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

Deno.test("KeyTitleCase - withWarning", () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyTitleCase",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Title Case formatting.",
        warnings: [
          { key: "policyId", path: "policyId" },
          { key: "assetName", path: "assetName" },
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
      assetName: "asset000",
      validatorId: "key-title-case",
      output: undefined,
    },
  ]);
});

Deno.test("KeyCamelCase - withWarning", () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyCamelCase",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: metadata[0],
      output: undefined,
      assetName: "asset000",
      validatorId: "key-camel-case",
    },
  ]);
});

Deno.test("KeySnakeCase - withWarning", () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeySnakeCase",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Snake Case formatting.",
        warnings: [
          { key: "policyId", path: "policyId" },
          {
            key: "assetName",
            path: "assetName",
          },
          { key: "mediaType", path: "mediaType" },
        ],
      },
      input: metadata[0],
      output: undefined,
      assetName: "asset000",
      validatorId: "key-snake-case",
    },
  ]);
});

Deno.test("KeyLowerCase - withWarning", () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyLowerCase",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Lower Case formatting.",
        warnings: [
          { key: "policyId", path: "policyId" },
          {
            key: "assetName",
            path: "assetName",
          },
          { key: "mediaType", path: "mediaType" },
        ],
      },
      input: metadata[0],
      output: undefined,
      assetName: "asset000",
      validatorId: "key-lower-case",
    },
  ]);
});

Deno.test("KeyUpperCase - withWarning", () => {
  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyUpperCase",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Upper Case formatting.",
        warnings: [
          { key: "policyId", path: "policyId" },
          { key: "assetName", path: "assetName" },
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
      assetName: "asset000",
      validatorId: "key-upper-case",
    },
  ]);
});

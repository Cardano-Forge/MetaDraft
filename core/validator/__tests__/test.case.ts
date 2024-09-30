import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyTitleCase } from "../src/rules/key-title-case.ts";
import { KeyCamelCase } from "../src/rules/key-camel-case.ts";
import { KeyLowerCase } from "../src/rules/key-lower-case.ts";
import { KeyUpperCase } from "../src/rules/key-upper-case.ts";
import { KeySnakeCase } from "../src/rules/key-snake-case.ts";
import { KeyAnvilCase } from "../src/rules/key-anvil-case.ts";

const metadata = [
  {
    assetName: "asset000",
    metadata: {
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
  },
];

Deno.test("KeyTitleCase - withWarning", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyTitleCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-title-case");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 8);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "name",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[1].path, [
    "image",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[2].path, [
    "mediaType",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[3].path, [
    "description",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[4].path, [
    "files",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[5].path, [
    "attributes",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[6].path, [
    "attributes",
    "foo",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[7].path, [
    "traits",
  ]);
});

Deno.test("KeyCamelCase - withSuccess", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyCamelCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {});
});

Deno.test("KeySnakeCase - withWarning", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeySnakeCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-snake-case");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 1);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "mediaType",
  ]);
});

Deno.test("KeyLowerCase - withWarning", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyLowerCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-lower-case");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 1);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "mediaType",
  ]);
});

Deno.test("KeyUpperCase - withWarning", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyUpperCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-upper-case");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 8);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "name",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[1].path, [
    "image",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[2].path, [
    "mediaType",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[3].path, [
    "description",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[4].path, [
    "files",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[5].path, [
    "attributes",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[6].path, [
    "attributes",
    "foo",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[7].path, [
    "traits",
  ]);
});

Deno.test("AnvilCasing - withWarning", () => {
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyAnvilCase());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-anvil-case");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 1);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "attributes",
    "foo",
  ]);
});

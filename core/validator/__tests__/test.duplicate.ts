import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateKeysValidator } from "../src/rules/duplicate-keys.ts";
import { ZodCustomIssue } from "zod";

Deno.test("DuplicateKeys - withWarnings", () => {
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
          Hat: "un chapeau",
          Face: "un visage",
          Special1: { name: "C'est Special", value: "Brilliant !" },
          Special2: { name: "C'est Special", value: "Brilliant !" },
          attributes: {
            Hat: "un chapeau",
            Face: "un visage",
            Special1: { name: "C'est Special", value: "Brilliant !" },
            Special2: { name: "C'est Special", value: "Brilliant !" },
          },
        },
        traits: ["trait-1", "trait-2"],
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateKeysValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "duplicate-keys");

  assertEquals(
    result["asset000"].warnings[0].validationError.issues[0].message,
    'Key "name" appear multiple times within the provided metadata.'
  );
  assertEquals(result["asset000"].warnings[0].validationError.issues[0].path, [
    "name",
  ]);

  assertEquals(
    result["asset000"].warnings[0].validationError.issues[1].message,
    'Key "name" appear multiple times within the provided metadata.'
  );
  assertEquals(result["asset000"].warnings[0].validationError.issues[1].path, [
    "attributes",
    "Special1",
    "name",
  ]);

  assertEquals(
    result["asset000"].warnings[0].validationError.issues[2].message,
    'Key "value" appear multiple times within the provided metadata.'
  );
  assertEquals(result["asset000"].warnings[0].validationError.issues[2].path, [
    "attributes",
    "Special1",
    "value",
  ]);
});

Deno.test("DuplicateKeys - withSuccess", () => {
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
          Hat: "un chapeau",
          Face: "un visage",
          Special1: { name: "C'est Special", value: "Brilliant !" },
          Special2: { name: "C'est Special", value: "Brilliant !" },
        },
        traits: ["trait-1", "trait-2"],
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateKeysValidator());

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

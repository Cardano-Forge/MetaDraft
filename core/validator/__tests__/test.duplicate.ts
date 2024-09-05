import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateKeysValidator } from "../src/rules/duplicate-keys.ts";

Deno.test("DuplicateKeys - withWarnings", () => {
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
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateKeysValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();
  assertEquals(result, {
    asset000: {
      status: "warning",
      warnings: [
        {
          validatorId: "duplicate-keys",
          message: {
            message:
              "Some keys appear multiple times within the provided metadata. The following keys were found more than once",
            warnings: [
              {
                field: "name",
                paths: [
                  "name",
                  "attributes.Special1.name",
                  "attributes.Special2.name",
                  "attributes.attributes.Special1.name",
                  "attributes.attributes.Special2.name",
                ],
                occurences: 5,
              },
              {
                field: "value",
                paths: [
                  "attributes.Special1.value",
                  "attributes.Special2.value",
                  "attributes.attributes.Special1.value",
                  "attributes.attributes.Special2.value",
                ],
                occurences: 4,
              },
            ],
          },
        },
      ],
      errors: [],
    },
  });
});

Deno.test("DuplicateKeys - withSuccess", () => {
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
        Hat: "un chapeau",
        Face: "un visage",
        Special1: { name: "C'est Special", value: "Brilliant !" },
        Special2: { name: "C'est Special", value: "Brilliant !" },
      },
      traits: ["trait-1", "trait-2"],
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateKeysValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset000: { status: "success", warnings: [], errors: [] },
  });
});

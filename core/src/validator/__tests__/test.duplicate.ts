import { assertEquals } from "jsr:@std/assert@1";

import { Decorator } from "../core.ts";

import { DuplicateKeysValidator } from "../rules/duplicate-keys.ts";

const mapping = {
  DuplicateKeysValidator: DuplicateKeysValidator,
} as const;

Deno.test("DuplicateKeys - withWarnings", async () => {
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

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "DuplicateKeysValidator",
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

  // console.log(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "warning",
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
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
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
      asset_name: "asset000",
      validator_id: "duplicate-keys",
    },
  ]);
});

Deno.test("DuplicateKeys - withSuccess", async () => {
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
        Hat: "un chapeau",
        Face: "un visage",
        Special1: { name: "C'est Special", value: "Brilliant !" },
        Special2: { name: "C'est Special", value: "Brilliant !" },
      },
      traits: ["trait-1", "trait-2"],
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "DuplicateKeysValidator",
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

  console.log(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "success",
      message: "No significant duplicates detected in the metadata.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
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
      asset_name: "asset000",
      validator_id: "duplicate-keys",
    },
  ]);
});

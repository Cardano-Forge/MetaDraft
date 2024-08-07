import { assertEquals } from "jsr:@std/assert@1";

import { Decorator } from "../core.ts";

import { KeyTraitsValidator } from "../rules/key-traits.ts";

const mapping = {
  KeyTraitsValidator: KeyTraitsValidator,
} as const;

Deno.test("KeyTraitsValidator - withWarning", async () => {
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

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyTraitsValidator",
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

  assertEquals(result, [
    {
      state: "warning",
      message: {
        formErrors: [],
        fieldErrors: {
          traits: [
            {
              message: "All elements in the array should be of the same type.",
              errorCode: "custom",
              status: "warning",
              path: "traits",
            },
            {
              message: "It is recommended to use string instead of number",
              errorCode: "custom",
              status: "warning",
              path: "traits/2",
            },
          ],
        },
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
        attributes: { foo: "bar" },
        traits: ["trait-1", { name: "trait-2", value: "2" }, 1],
      },
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-traits",
    },
  ]);
});

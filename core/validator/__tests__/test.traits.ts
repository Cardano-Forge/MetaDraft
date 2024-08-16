import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyTraitsValidator } from "../src/rules/key-traits.ts";

const mapping = {
  KeyTraitsValidator: KeyTraitsValidator,
} as const;

Deno.test("KeyTraitsValidator - withWarning", () => {
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

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyTraitsValidator",
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
      input: metadata[0],
      output: undefined,
      assetName: "asset000",
      validatorId: "key-traits",
    },
  ]);
});

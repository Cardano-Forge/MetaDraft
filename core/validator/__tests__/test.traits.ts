import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyTraitsValidator } from "../src/rules/key-traits.ts";

Deno.test("KeyTraitsValidator - withWarning", () => {
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

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyTraitsValidator());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-traits");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 2);
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "traits",
  ]);
  assertEquals(result["asset000"].warnings[0].validationErrors[1].path, [
    "traits",
    2,
  ]);
});

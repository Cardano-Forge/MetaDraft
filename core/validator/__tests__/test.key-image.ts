import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { KeyImage } from "../src/rules/key-image.ts";

Deno.test("key-value-image - BASE64 (success)", () => {
  const metadata = [
    {
      assetName: "asset000",
      metadata: {
        name: "asset000",
        image: [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby",
          "blAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU",
          "5ErkJggg==",
        ],
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyImage());

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

Deno.test("key-value-image - IPFS (success)", () => {
  const metadata = [
    {
      assetName: "asset000",
      metadata: {
        name: "asset000",
        image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyImage());

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

Deno.test("key-value-image - string (warning)", () => {
  const metadata = [
    {
      assetName: "asset000",
      metadata: {
        name: "asset000",
        image: "QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyImage());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-image");

  assertEquals(
    result["asset000"].warnings[0].validationErrors[0].message,
    "The string must be a valid URI (including ipfs://) or BASE64 format."
  );
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "image",
  ]);
});

Deno.test("key-value-image - string too long (warning)", () => {
  const metadata = [
    {
      assetName: "asset000",
      metadata: {
        name: "asset000",
        image:
          "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK0000000000000",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyImage());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-image");

  assertEquals(
    result["asset000"].warnings[0].validationErrors[0].message,
    "The string must be at most 64 characters long."
  );
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "image",
  ]);
});

Deno.test("key-value-image - BASE64 string too long (warning)", () => {
  const metadata = [
    {
      assetName: "asset000",
      metadata: {
        name: "asset000",
        image: [
          "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNby0",
          "blAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU",
          "5ErkJggg==",
        ],
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new KeyImage());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      asset_metadata.assetName,
      asset_metadata.metadata,
      metadata
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "key-image");

  assertEquals(
    result["asset000"].warnings[0].validationErrors[0].message,
    "Each string in the array must be 64 length or less."
  );
  assertEquals(result["asset000"].warnings[0].validationErrors[0].path, [
    "image",
  ]);
});

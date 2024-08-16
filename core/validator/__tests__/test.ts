import { assertEquals } from "@std/assert";
import { Buffer } from "node:buffer";

import { Decorator } from "../src/core.ts";

import { Cip25Version1Validator } from "../src/rules/cip-25-version-1.ts";
import { Cip25Version2Validator } from "../src/rules/cip-25-version-2.ts";
import { KeyNameValidator } from "../src/rules/key-name.ts";
import { KeyImageValidator } from "../src/rules/key-image.ts";
import { KeyMediaTypeValidator } from "../src/rules/key-media-type.ts";
import { KeyDescriptionValidator } from "../src/rules/key-description.ts";
import { KeyFilesValidator } from "../src/rules/key-files.ts";
import { KeyAttributesValidator } from "../src/rules/key-attributes.ts";
import { KeyTraitsValidator } from "../src/rules/key-traits.ts";
import { HasRequiredKeysValidator } from "../src/rules/has-required-keys.ts";

const mapping = {
  Cip25Version1Validator: Cip25Version1Validator,
  Cip25Version2Validator: Cip25Version2Validator,
  KeyNameValidator: KeyNameValidator,
  KeyImageValidator: KeyImageValidator,
  KeyMediaTypeValidator: KeyMediaTypeValidator,
  KeyDescriptionValidator: KeyDescriptionValidator,
  KeyFilesValidator: KeyFilesValidator,
  KeyAttributesValidator: KeyAttributesValidator,
  KeyTraitsValidator: KeyTraitsValidator,
  HasRequiredKeysValidator: HasRequiredKeysValidator,
} as const;

Deno.test("Cip25Version1Validator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset000",
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset001",
      name: "asset001",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset002",
      name: "asset002",
      image: "ipfs://...",
      mediaType: "image/png",
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "Cip25Version1Validator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[0],
      },
      output: {
        assetName: "asset000",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "asset000",
      validatorId: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[1],
      },
      output: {
        assetName: "asset001",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "asset001",
      validatorId: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[2],
      },
      output: {
        assetName: "asset002",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "asset002",
      validatorId: "cip-25-version-1",
    },
  ]);
});

Deno.test("Cip25Version2Validator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: Buffer.from("asset000").toString("hex"),
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: Buffer.from("asset001").toString("hex"),
      name: "asset001",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: Buffer.from("asset002").toString("hex"),
      name: "asset002",
      image: "ipfs://...",
      mediaType: "image/png",
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "Cip25Version2Validator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[0],
      },
      output: {
        assetName: "6173736574303030",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "6173736574303030",
      validatorId: "cip-25-version-2",
    },
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[1],
      },
      output: {
        assetName: "6173736574303031",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "6173736574303031",
      validatorId: "cip-25-version-2",
    },
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        ...metadata[2],
      },
      output: {
        assetName: "6173736574303032",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "6173736574303032",
      validatorId: "cip-25-version-2",
    },
  ]);
});

Deno.test("KeyNameValidator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset000",
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyNameValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`name` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        name: "asset000",
      },
      assetName: "asset000",
      validatorId: "key-name",
    },
  ]);
});

Deno.test("KeyImageValidator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset000",
      name: "asset000",
      image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
      mediaType: "image/png",
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyImageValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`image` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        image: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
      },
      assetName: "asset000",
      validatorId: "key-image",
    },
  ]);
});

Deno.test("KeyMediaTypeValidator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset000",
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyMediaTypeValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`mediaType` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        mediaType: "image/png",
      },
      assetName: "asset000",
      validatorId: "key-media-type",
    },
  ]);
});

Deno.test("KeyDescriptionValidator", () => {
  const metadata = [
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset000",
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
      description:
        "a non empty description using a random length because Im testing", // 64 chars
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyDescriptionValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`description` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        description:
          "a non empty description using a random length because Im testing",
      },
      assetName: "asset000",
      validatorId: "key-description",
    },
  ]);
});

Deno.test("KeyFilesValidator", () => {
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
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyFilesValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`files` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        files: [
          {
            mediaType: "image/png",
            name: "oops",
            src: "ipfs://QmeJzYpmU6pGCnSxbrtBofYmdeqmX4cQykCL8pZAJfMAVK",
          },
        ],
      },
      assetName: "asset000",
      validatorId: "key-files",
    },
  ]);
});

Deno.test("KeyAttributesValidator", () => {
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
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyAttributesValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "`attributes` field is valid.",
      input: {
        ...metadata[0],
      },
      output: {
        attributes: {
          foo: "bar",
        },
      },
      assetName: "asset000",
      validatorId: "key-attributes",
    },
  ]);
});

Deno.test("KeyTraitsValidator", () => {
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
      traits: ["trait-1", { name: "trait-2", value: "2" }, "1"],
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
          ],
        },
      },
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
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
        traits: ["trait-1", { name: "trait-2", value: "2" }, "1"],
      },
      output: undefined,
      assetName: "asset000",
      validatorId: "key-traits",
    },
  ]);
});

Deno.test("HasRequiredKeys", () => {
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
      traits: ["trait-1", "trait-2"],
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "HasRequiredKeysValidator",
  ];

  const mainValidator = new Decorator("Main");
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
      message: "All required keys are present.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
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
        traits: ["trait-1", "trait-2"],
      },
      assetName: "asset000",
      validatorId: "has-required-keys",
      output: undefined,
    },
  ]);
});

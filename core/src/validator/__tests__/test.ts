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

Deno.test("Cip25Version1Validator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset000",
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset001",
      name: "asset001",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset002",
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[0],
      },
      output: {
        asset_name: "asset000",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "asset000",
      validator_id: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[1],
      },
      output: {
        asset_name: "asset001",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "asset001",
      validator_id: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[2],
      },
      output: {
        asset_name: "asset002",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "asset002",
      validator_id: "cip-25-version-1",
    },
  ]);
});

Deno.test("Cip25Version2Validator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: Buffer.from("asset000").toString("hex"),
      name: "asset000",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: Buffer.from("asset001").toString("hex"),
      name: "asset001",
      image: "ipfs://...",
      mediaType: "image/png",
    },
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: Buffer.from("asset002").toString("hex"),
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[0],
      },
      output: {
        asset_name: "6173736574303030",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "6173736574303030",
      validator_id: "cip-25-version-2",
    },
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[1],
      },
      output: {
        asset_name: "6173736574303031",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "6173736574303031",
      validator_id: "cip-25-version-2",
    },
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        ...metadata[2],
      },
      output: {
        asset_name: "6173736574303032",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "6173736574303032",
      validator_id: "cip-25-version-2",
    },
  ]);
});

Deno.test("KeyNameValidator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset000",
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-name",
    },
  ]);
});

Deno.test("KeyImageValidator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset000",
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-image",
    },
  ]);
});

Deno.test("KeyMediaTypeValidator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset000",
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-media-type",
    },
  ]);
});

Deno.test("KeyDescriptionValidator", async () => {
  const metadata = [
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset000",
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-description",
    },
  ]);
});

Deno.test("KeyFilesValidator", async () => {
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-files",
    },
  ]);
});

Deno.test("KeyAttributesValidator", async () => {
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
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
      asset_name: "asset000",
      validator_id: "key-attributes",
    },
  ]);
});

Deno.test("KeyTraitsValidator", async () => {
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
        traits: ["trait-1", { name: "trait-2", value: "2" }, "1"],
      },
      output: undefined,
      asset_name: "asset000",
      validator_id: "key-traits",
    },
  ]);
});

Deno.test("HasRequiredKeys", async () => {
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
    await mainValidator.Execute(
      asset_metadata.asset_name,
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "All required keys are present.",
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
        traits: ["trait-1", "trait-2"],
      },
      asset_name: "asset000",
      validator_id: "has-required-keys",
      output: undefined,
    },
  ]);
});

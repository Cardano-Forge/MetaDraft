import { assertEquals } from "jsr:@std/assert@1";

import { Decorator } from "../core.ts";

import { CompareRootKeys } from "../rules/compare-root-keys.ts";
import { CompareRootValues } from "../rules/compare-root-values.ts";
import { CompareAttributesKeys } from "../rules/compare-attributes-keys.ts";

const mapping = {
  CompareRootKeys: CompareRootKeys,
  CompareRootValues: CompareRootValues,
  CompareAttributesKeys: CompareAttributesKeys,
} as const;

Deno.test("CompareRootKeys - withSuccess", async () => {
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
    "CompareRootKeys",
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
      state: "success",
      message: "No similar keys found.",
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
      validator_id: "compare-root-keys",
      output: undefined,
    },
  ]);
});

Deno.test("CompareRootKeys - withWarning", async () => {
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
      attrybutes: {
        bar: "foo",
        oops: "a typo",
      },
      traits: ["trait-1", "trait-2"],
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "CompareRootKeys",
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
      message: [
        "attributes is similar to attrybutes",
        "attrybutes is similar to attributes",
      ],
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
        attrybutes: { bar: "foo", oops: "a typo" },
        traits: ["trait-1", "trait-2"],
      },
      asset_name: "asset000",
      validator_id: "compare-root-keys",
      output: undefined,
    },
  ]);
});

Deno.test("CompareRootValues - withSuccess", async () => {
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
      attrybutes: {
        bar: "foo",
        oops: "a typo",
      },
      traits: ["trait-1", "trait-2"],
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "CompareRootValues",
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
      state: "success",
      message: "No similar values found.",
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
        attrybutes: { bar: "foo", oops: "a typo" },
        traits: ["trait-1", "trait-2"],
      },
      asset_name: "asset000",
      validator_id: "compare-root-values",
      output: undefined,
    },
  ]);
});

Deno.test("CompareAttributesValues - withSuccess", async () => {
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
        foo1: "bar",
        foz: "bar",
        child: "children1",
        hello: "world",
      },
      attrybutes: {
        bar: "foo",
        oops: "a typo",
      },
      traits: ["trait-1", "trait-2"],
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "CompareAttributesKeys",
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
      message: [
        "foo is similar to foo1",
        "foo1 is similar to foo",
        "foz is similar to foo",
      ],
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
          foo: "bar",
          foo1: "bar",
          foz: "bar",
          child: "children1",
          hello: "world",
        },
        attrybutes: { bar: "foo", oops: "a typo" },
        traits: ["trait-1", "trait-2"],
      },
      asset_name: "asset000",
      validator_id: "compare-attributes-keys",
      output: undefined,
    },
  ]);
});

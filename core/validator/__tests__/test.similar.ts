import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { CompareRootKeys } from "../src/rules/compare-root-keys.ts";
import { CompareRootValues } from "../src/rules/compare-root-values.ts";
import { CompareAttributesKeys } from "../src/rules/compare-attributes-keys.ts";

const mapping = {
  CompareRootKeys: CompareRootKeys,
  CompareRootValues: CompareRootValues,
  CompareAttributesKeys: CompareAttributesKeys,
} as const;

Deno.test("CompareRootKeys - withSuccess", () => {
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
    "CompareRootKeys",
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
      state: "success",
      message: "No similar keys found.",
      input: metadata[0],
      assetName: "asset000",
      validatorId: "compare-root-keys",
      output: undefined,
    },
  ]);
});

Deno.test("CompareRootKeys - withWarning", () => {
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
      message: [
        "attributes is similar to attrybutes",
        "attrybutes is similar to attributes",
      ],
      input: metadata[0],
      assetName: "asset000",
      validatorId: "compare-root-keys",
      output: undefined,
    },
  ]);
});

Deno.test("CompareRootValues - withSuccess", () => {
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
      state: "success",
      message: "No similar values found.",
      input: metadata[0],
      assetName: "asset000",
      validatorId: "compare-root-values",
      output: undefined,
    },
  ]);
});

Deno.test("CompareAttributesValues - withSuccess", () => {
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
      message: [
        "foo is similar to foo1",
        "foo1 is similar to foo",
        "foz is similar to foo",
      ],
      input: metadata[0],
      assetName: "asset000",
      validatorId: "compare-attributes-keys",
      output: undefined,
    },
  ]);
});

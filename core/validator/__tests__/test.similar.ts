import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { CompareRootKeys } from "../src/rules/compare-root-keys.ts";
import { CompareRootValues } from "../src/rules/compare-root-values.ts";
import { CompareAttributesKeys } from "../src/rules/compare-attributes-keys.ts";

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

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new CompareRootKeys());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {});
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

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new CompareRootKeys());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(result["asset000"].warnings[0].validatorId, "compare-root-keys");
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 2);
  assertEquals(
    result["asset000"].warnings[0].validationErrors[0].message,
    "attributes is similar to attrybutes"
  );
  assertEquals(
    result["asset000"].warnings[0].validationErrors[1].message,
    "attrybutes is similar to attributes"
  );
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

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new CompareRootValues());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result, {});
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

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new CompareAttributesKeys());

  for (const asset_metadata of metadata) {
    mainValidator.Execute(asset_metadata.assetName, asset_metadata, metadata);
  }

  const result = mainValidator.GetResults();

  assertEquals(result["asset000"].status, "warning");
  assertEquals(
    result["asset000"].warnings[0].validatorId,
    "compare-attributes-keys"
  );
  assertEquals(result["asset000"].warnings[0].validationErrors.length, 3);
  assertEquals(
    result["asset000"].warnings[0].validationErrors[0].message,
    "foo is similar to foo1"
  );
  assertEquals(
    result["asset000"].warnings[0].validationErrors[1].message,
    "foo1 is similar to foo"
  );
  assertEquals(
    result["asset000"].warnings[0].validationErrors[2].message,
    "foz is similar to foo"
  );
});

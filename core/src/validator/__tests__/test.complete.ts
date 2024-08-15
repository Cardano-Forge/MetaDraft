import { assertEquals } from "@std/assert";

import { Decorator } from "../src/core.ts";

import { Cip25Version1Validator } from "../src/rules/cip-25-version-1.ts";
import { Cip25Version2Validator } from "../src/rules/cip-25-version-2.ts";
import { KeyNameValidator } from "../src/rules/key-name.ts";
import { KeyImageValidator } from "../src/rules/key-image.ts";
import { KeyMediaTypeValidator } from "../src/rules/key-media-type.ts";
import { KeyDescriptionValidator } from "../src/rules/key-description.ts";

const mapping = {
  Cip25Version1Validator: Cip25Version1Validator,
  Cip25Version2Validator: Cip25Version2Validator,
  KeyNameValidator: KeyNameValidator,
  KeyImageValidator: KeyImageValidator,
  KeyMediaTypeValidator: KeyMediaTypeValidator,
  KeyDescriptionValidator: KeyDescriptionValidator,
} as const;

Deno.test("TestMultipleValidators", () => {
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
    {
      policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      assetName: "asset001",
      name: "asset001",
      image: "ipfs://...",
      mediaType: "image/png",
      description:
        "a non empty  long description using a random length because Im testing", // should be marked as warning.
    },
  ];

  const validatorsReceivedFromFrontend: Array<keyof typeof mapping> = [
    "Cip25Version1Validator",
    "KeyNameValidator",
    "KeyImageValidator",
    "KeyMediaTypeValidator",
    "KeyDescriptionValidator",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: {
        assetName: "asset000",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "policyId",
      validatorId: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: { name: "asset000" },
      assetName: "policyId",
      validatorId: "key-name",
    },
    {
      state: "error",
      message: {
        formErrors: [],
        fieldErrors: {
          image: [
            {
              message:
                "The string must be a valid URI (including ipfs://) or BASE64 format.",
              errorCode: "custom",
              path: "image",
              status: "error",
            },
          ],
        },
      },
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      assetName: "policyId",
      validatorId: "key-image",
      output: undefined,
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: { mediaType: "image/png" },
      assetName: "policyId",
      validatorId: "key-media-type",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: {
        description:
          "a non empty description using a random length because Im testing",
      },
      assetName: "policyId",
      validatorId: "key-description",
    },
    {
      state: "success",
      message: "`assetName` and `policyId` fields are valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: {
        assetName: "asset001",
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      assetName: "policyId",
      validatorId: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: { name: "asset001" },
      assetName: "policyId",
      validatorId: "key-name",
    },
    {
      state: "error",
      message: {
        formErrors: [],
        fieldErrors: {
          image: [
            {
              message:
                "The string must be a valid URI (including ipfs://) or BASE64 format.",
              errorCode: "custom",
              path: "image",
              status: "error",
            },
          ],
        },
      },
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      assetName: "policyId",
      validatorId: "key-image",
      output: undefined,
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: { mediaType: "image/png" },
      assetName: "policyId",
      validatorId: "key-media-type",
    },
    {
      state: "error",
      message: {
        formErrors: [],
        fieldErrors: {
          description: [
            {
              message: "The string must be at most 64 characters long.",
              errorCode: "too_big",
              path: "description",
              status: "error",
            },
          ],
        },
      },
      input: {
        policyId: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        assetName: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      assetName: "policyId",
      validatorId: "key-description",
      output: undefined,
    },
  ]);
});

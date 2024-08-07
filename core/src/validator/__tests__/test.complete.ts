import { assertEquals } from "jsr:@std/assert@1";
import { Buffer } from "node:buffer";

import { Decorator } from "../core.ts";

import { Cip25Version1Validator } from "../rules/cip-25-version-1.ts";
import { Cip25Version2Validator } from "../rules/cip-25-version-2.ts";
import { KeyNameValidator } from "../rules/key-name.ts";
import { KeyImageValidator } from "../rules/key-image.ts";
import { KeyMediaTypeValidator } from "../rules/key-media-type.ts";
import { KeyDescriptionValidator } from "../rules/key-description.ts";

const mapping = {
  Cip25Version1Validator: Cip25Version1Validator,
  Cip25Version2Validator: Cip25Version2Validator,
  KeyNameValidator: KeyNameValidator,
  KeyImageValidator: KeyImageValidator,
  KeyMediaTypeValidator: KeyMediaTypeValidator,
  KeyDescriptionValidator: KeyDescriptionValidator,
} as const;

Deno.test("TestMultipleValidators", async () => {
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
    {
      policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      asset_name: "asset001",
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
    await mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      asset_metadata,
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  // console.log(JSON.stringify(result));

  assertEquals(result, [
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: {
        asset_name: "asset000",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "policy_id",
      validator_id: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: { name: "asset000" },
      asset_name: "policy_id",
      validator_id: "key-name",
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
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      asset_name: "policy_id",
      validator_id: "key-image",
      output: undefined,
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
        name: "asset000",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty description using a random length because Im testing",
      },
      output: { mediaType: "image/png" },
      asset_name: "policy_id",
      validator_id: "key-media-type",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset000",
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
      asset_name: "policy_id",
      validator_id: "key-description",
    },
    {
      state: "success",
      message: "`asset_name` and `policy_id` fields are valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: {
        asset_name: "asset001",
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
      },
      asset_name: "policy_id",
      validator_id: "cip-25-version-1",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: { name: "asset001" },
      asset_name: "policy_id",
      validator_id: "key-name",
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
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      asset_name: "policy_id",
      validator_id: "key-image",
      output: undefined,
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      output: { mediaType: "image/png" },
      asset_name: "policy_id",
      validator_id: "key-media-type",
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
        policy_id: "94da605878403d07c144fe96cd50fe20c16186dd8d171c78ed6a8768",
        asset_name: "asset001",
        name: "asset001",
        image: "ipfs://...",
        mediaType: "image/png",
        description:
          "a non empty  long description using a random length because Im testing",
      },
      asset_name: "policy_id",
      validator_id: "key-description",
      output: undefined,
    },
  ]);
});

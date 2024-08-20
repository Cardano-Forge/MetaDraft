import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { mapping, Validator } from "../../src/mod.ts";

Deno.test("TestEarthnode", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "earthnode.json"), "utf8"),
    ),
  ];

  const validatorsReceivedFromFrontend: Array<keyof typeof mapping> = [
    "hasRequiredKeysValidator",
    "compareRootKeys",
    "compareRootValues",
    "keyCamelCase",
    "keyAttributesValidator",
    "compareAttributesKeys",
    "keyWhiteSpace",
    "keyNameValidator",
    "keyLength",
    "keyMediaTypeValidator",
    "keyMediaValidator",
    "keyImageValidator",
    "keyFilesValidator",
    "keyDescriptionValidator",
    "keyAlphanumeric",
    "duplicateImage",
    "duplicateAssetName",
    "duplicateKeysValidator",
    "keyTraitsValidator",
  ];

  const mainValidator = new Validator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      Object.values(asset_metadata)[0],
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  assertEquals(result, [
    {
      state: "success",
      message: "All required keys are present.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "has-required-keys",
    },
    {
      state: "success",
      message: "No similar keys found.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "compare-root-keys",
    },
    {
      state: "success",
      message: "No similar values found.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "compare-root-values",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "key-camel-case",
    },
    {
      state: "success",
      message: "`attributes` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {},
      assetName: "EarthNode976",
      validatorId: "key-attributes",
    },
    {
      state: "warning",
      message: [
        "The `attributes` key might be missing from the supplied metadata, or an invalid threshold value may have been set.",
      ],
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "compare-attributes-keys",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "key-white-space",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: { name: "EarthNode #976" },
      assetName: "EarthNode976",
      validatorId: "key-name",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "key-length",
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: { mediaType: "image/png" },
      assetName: "EarthNode976",
      validatorId: "key-media-type",
    },
    {
      state: "success",
      message: "`media` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {},
      assetName: "EarthNode976",
      validatorId: "key-media",
    },
    {
      state: "success",
      message: "`image` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
      },
      assetName: "EarthNode976",
      validatorId: "key-image",
    },
    {
      state: "success",
      message: "`files` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {
        files: [
          {
            name: "EarthNode",
            mediaType: "video/mp4",
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
          },
        ],
      },
      assetName: "EarthNode976",
      validatorId: "key-files",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      assetName: "EarthNode976",
      validatorId: "key-description",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "key-alphanumeric",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "duplicate-image",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "duplicate-asset-name",
    },
    {
      state: "success",
      message: "No significant duplicates detected in the metadata.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: undefined,
      assetName: "EarthNode976",
      validatorId: "duplicate-keys",
    },
    {
      state: "success",
      message: "`traits` field is valid.",
      input: {
        name: "EarthNode #976",
        files: [
          {
            src: "ipfs://QmdqYBApdNWcHZn8rCj83xXdQXvoLfxumkJAzEHvTkMDTC",
            name: "EarthNode",
            mediaType: "video/mp4",
          },
        ],
        image: "ipfs://QmYUA3THPRhQcdmSzgJUTYMa98hvYWtD9i9vUG8ZcNeQeo",
        mediaType: "image/png",
        description:
          "Identifies the holder as a World Mobile EarthNode Operator",
      },
      output: {},
      assetName: "EarthNode976",
      validatorId: "key-traits",
    },
  ]);
});

import { assertEquals } from "@std/assert";
import { join } from "node:path";
import { readFileSync } from "node:fs";

import { mapping, Validator } from "../../src/mod.ts";

Deno.test("TestPavia", () => {
  const metadata = [
    JSON.parse(
      readFileSync(join("__tests__", "payloads", "pavia.json"), "utf8"),
    ),
  ];

  const validatorsReceivedFromFrontend: Array<keyof typeof mapping> = [
    "hasRequiredKeysValidator",
    "compareRootKeys",
    "compareRootValues",
    "keyCamelCase",
    "keyWhiteSpace",
    "keyNameValidator",
    "keyLength",
    "keyMediaTypeValidator",
    "keyImageValidator",
    "keyFilesValidator",
    "keyDescriptionValidator",
    "keyAlphanumeric",
    "duplicateImage",
    "duplicateAssetName",
    "duplicateKeysValidator",
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
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "has-required-keys",
    },
    {
      state: "success",
      message: "No similar keys found.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "compare-root-keys",
    },
    {
      state: "success",
      message: "No similar values found.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "compare-root-values",
    },
    {
      state: "warning",
      message: {
        message: "Some keys do not adhere to Camel Case formatting.",
        warnings: [
          { key: "Pavia io", path: "productInformation.Pavia io" },
          { key: "Copyright", path: "productInformation.Copyright" },
        ],
      },
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "key-camel-case",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "key-white-space",
    },
    {
      state: "success",
      message: "`name` field is valid.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: { name: "Pavia Estate #676" },
      assetName: "PaviaEstate676",
      validatorId: "key-name",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "key-length",
    },
    {
      state: "success",
      message: "`mediaType` field is valid.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: { mediaType: "image/png" },
      assetName: "PaviaEstate676",
      validatorId: "key-media-type",
    },
    {
      state: "success",
      message: "`image` field is valid.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: {
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
      },
      assetName: "PaviaEstate676",
      validatorId: "key-image",
    },
    {
      state: "success",
      message: "`files` field is valid.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: {
        files: [
          {
            name: "Estate",
            mediaType: "image/png",
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
          },
        ],
      },
      assetName: "PaviaEstate676",
      validatorId: "key-files",
    },
    {
      state: "success",
      message: "`description` field is valid.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: { description: "The combination of 10 Pavia land parcels" },
      assetName: "PaviaEstate676",
      validatorId: "key-description",
    },
    {
      state: "warning",
      message: {
        message:
          "Only alphanumeric characters, dashes, and underscores are allowed for the key.",
        warnings: [{ key: "Pavia io", path: "productInformation.Pavia io" }],
      },
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "key-alphanumeric",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "duplicate-image",
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "duplicate-asset-name",
    },
    {
      state: "success",
      message: "No significant duplicates detected in the metadata.",
      input: {
        name: "Pavia Estate #676",
        size: 10,
        type: "Estate",
        files: [
          {
            src: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
            name: "Estate",
            mediaType: "image/png",
          },
        ],
        image: "ipfs://QmNzTA7L312nALsacU7wfY2FvKtYk47GVENJq99Wheicay",
        plots: [
          [-192, -116],
          [-193, -116],
          [-193, -117],
          [-193, -118],
          [-194, -116],
          [-194, -117],
          [-194, -118],
          [-195, -116],
          [-195, -117],
          [-195, -118],
        ],
        minter: [
          "addr1q9jfztl0536jgz0urdlgetknzz06nku68ulhaznz8zhgsumxqy6nwh2rqdf",
          "5st4hhp3whtwnc8sua8768kcqar3vk2sstgjr5t",
        ],
        mediaType: "image/png",
        estateSize: 10,
        description: "The combination of 10 Pavia land parcels",
        productInformation: {
          "Pavia io": "https://pavia.io",
          Copyright: "Pavia Corp 2024 all rights reserved",
        },
      },
      output: undefined,
      assetName: "PaviaEstate676",
      validatorId: "duplicate-keys",
    },
  ]);
});

import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateImage } from "../src/rules/duplicate-image.ts";

const mapping = {
  DuplicateImage: DuplicateImage,
} as const;

Deno.test("DuplicateImage - withWarning", () => {
  const metadata = [
    {
      asset_0000: {
        image: "adibou.png",
      },
    },
    {
      asset_0001: {
        image: "adibou.png",
      },
    },
    {
      asset_0002: {
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "DuplicateImage",
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
      state: "warning",
      message: {
        message: "Duplicated images identified across assets.",
        warnings: ["Duplicate image 'adibou.png' found in assets."],
      },
      input: {
        image: "adibou.png",
      },
      assetName: "asset_0000",
      validatorId: "duplicate-image",
      output: undefined,
    },
    {
      state: "warning",
      message: {
        message: "Duplicated images identified across assets.",
        warnings: ["Duplicate image 'adibou.png' found in assets."],
      },
      input: {
        image: "adibou.png",
      },
      assetName: "asset_0001",
      validatorId: "duplicate-image",
      output: undefined,
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        image: "roller-coaster-tycoon.png",
      },
      assetName: "asset_0002",
      validatorId: "duplicate-image",
      output: undefined,
    },
  ]);
});

Deno.test("DuplicateImage - withWarning", () => {
  const metadata = [
    {
      asset_0000: {
        image: ["windows95", "C:", "adibou.png"],
      },
    },
    {
      asset_0001: {
        image: ["windows95", "C:", "adibou.png"],
      },
    },
    {
      asset_0002: {
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "DuplicateImage",
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
      state: "warning",
      message: {
        message: "Duplicated images identified across assets.",
        warnings: ["Duplicate image 'windows95C:adibou.png' found in assets."],
      },
      input: {
        image: ["windows95", "C:", "adibou.png"],
      },
      assetName: "asset_0000",
      validatorId: "duplicate-image",
      output: undefined,
    },
    {
      state: "warning",
      message: {
        message: "Duplicated images identified across assets.",
        warnings: ["Duplicate image 'windows95C:adibou.png' found in assets."],
      },
      input: {
        image: ["windows95", "C:", "adibou.png"],
      },
      assetName: "asset_0001",
      validatorId: "duplicate-image",
      output: undefined,
    },
    {
      state: "success",
      message: "All checks passed. No issues detected.",
      input: {
        image: "roller-coaster-tycoon.png",
      },
      assetName: "asset_0002",
      validatorId: "duplicate-image",
      output: undefined,
    },
  ]);
});

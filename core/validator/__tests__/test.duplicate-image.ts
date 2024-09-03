import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateImage } from "../src/rules/duplicate-image.ts";

Deno.test("DuplicateImage - withWarning", () => {
  const metadata = [
    {
      assetName: "asset_0000",
      metadata: {
        name: "asset_0000",
        image: "adibou.png",
      },
    },
    {
      assetName: "asset_0001",
      metadata: {
        name: "asset_0001",
        image: "adibou.png",
      },
    },
    {
      assetName: "asset_0002",
      metadata: {
        name: "asset_0002",
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateImage());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset_0001: {
      status: "warning",
      warnings: [
        {
          validatorId: "duplicate-image",
          message: "Image: adibou.png has been detected as a duplicate.",
        },
      ],
    },
  });
});

Deno.test("DuplicateImage - withWarning", () => {
  const metadata = [
    {
      assetName: "asset_0000",
      metadata: {
        name: "asset_0000",
        image: ["windows95", "C:", "adibou.png"],
      },
    },
    {
      assetName: "asset_0001",
      metadata: {
        name: "asset_0001",
        image: ["windows95", "C:", "adibou.png"],
      },
    },
    {
      assetName: "asset_0002",
      metadata: {
        name: "asset_0002",
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateImage());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset_0001: {
      status: "warning",
      warnings: [
        {
          validatorId: "duplicate-image",
          message:
            "Image: windows95C:adibou.png has been detected as a duplicate.",
        },
      ],
    },
  });
});

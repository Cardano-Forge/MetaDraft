import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateName } from "../src/rules/duplicate-name.ts";
import { DuplicateAssetName } from "../src/rules/duplicate-asset-name.ts";

Deno.test("DuplicateAssetName - withError", () => {
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
        image: "roller-coaster-tycoon.png",
      },
    },
    {
      assetName: "asset_0000",
      metadata: {
        name: "asset_0002",
        image: "adibou.png",
      },
    },
    {
      assetName: "asset_0003",
      metadata: {
        name: "asset_0003",
        image: "roller-coaster-tycoon.png",
      },
    },
    {
      assetName: "asset_0000",
      metadata: {
        name: "asset_0004",
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateAssetName());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset_0000: {
      status: "error",
      warnings: [],
      errors: [
        {
          validatorId: "duplicate-asset-name",
          message:
            "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0000)",
        },
        {
          validatorId: "duplicate-asset-name",
          message:
            "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0002)",
        },
        {
          validatorId: "duplicate-asset-name",
          message:
            "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0004)",
        },
      ],
    },
  });
});

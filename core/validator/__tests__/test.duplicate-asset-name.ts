import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

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

  console.time("timeAll");
  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateAssetName());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();
  console.timeEnd("timeAll");

  assertEquals(result["asset_0000"].status, "error");
  assertEquals(
    result["asset_0000"].errors[0].validatorId,
    "duplicate-asset-name"
  );
  assertEquals(result["asset_0000"].errors.length, 3);
  assertEquals(
    result["asset_0000"].errors[0].validationError.issues[0].message,
    "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0000)"
  );
  assertEquals(
    result["asset_0000"].errors[1].validationError.issues[0].message,
    "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0002)"
  );
  assertEquals(
    result["asset_0000"].errors[2].validationError.issues[0].message,
    "AssetName: asset_0000 has been detected as a duplicate. (metadata.name = asset_0004)"
  );
});

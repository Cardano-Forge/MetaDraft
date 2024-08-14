import { assertEquals } from "@std/assert";

import { Decorator } from "../src/core.ts";

import { DuplicateAssetName } from "../src/rules/duplicate-asset-name.ts";

const mapping = {
  DuplicateAssetName: DuplicateAssetName,
} as const;

Deno.test("DuplicateAssetName - withWarning", async () => {
  const metadata = [
    {
      asset_0000: {
        image: "adibou.png",
      },
    },
    {
      asset_0000: {
        image: "adibou.png",
      },
    },
    {
      asset_0001: {
        image: "roller-coaster-tycoon.png",
      },
    },
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "DuplicateAssetName",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadata) {
    await mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      Object.values(asset_metadata)[0],
      metadata,
    );
  }

  const result = mainValidator.GetResults();

  console.debug(JSON.stringify(result, null, 2));
  // assertEquals(result, );
});

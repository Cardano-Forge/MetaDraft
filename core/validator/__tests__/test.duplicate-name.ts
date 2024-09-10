import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateName } from "../src/rules/duplicate-name.ts";

Deno.test("DuplicateName - withError", () => {
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
      assetName: "asset_0002",
      metadata: {
        name: "asset_0000",
        image: "adibou.png",
      },
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateName());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset_0002: {
      status: "error",
      warnings: [],
      errors: [
        {
          validatorId: "duplicate-name",
          message: "Name: asset_0000 has been detected as a duplicate.",
        },
      ],
    },
  });
});

import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";

import { DuplicateName } from "../src/rules/duplicate-name.ts";

Deno.test("DuplicateName - withWarning", () => {
  const metadata = [
    {
      name: "asset_0000",
      image: "adibou.png",
    },
    {
      name: "asset_0000",
      image: "adibou.png",
    },
    {
      name: "asset_0001",
      image: "roller-coaster-tycoon.png",
    },
  ];

  const mainValidator = new Validator("Main");
  mainValidator.Enable(new DuplicateName());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result, {
    asset_0000: {
      status: "error",
      warnings: [
        {
          validatorId: "duplicate-name",
          message: "Name: asset_0000 has been detected as a duplicate.",
        },
      ],
    },
  });
});

import { assertEquals } from "@std/assert";

import { Validator } from "../src/core.ts";
import { DuplicateNameAndImage } from "../src/rules/duplicate-name-and-image.ts";

Deno.test("DuplicateNameAndImage - withError", () => {
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
  mainValidator.Enable(new DuplicateNameAndImage());

  mainValidator.ExecuteOnce(metadata);

  const result = mainValidator.GetResults();

  assertEquals(result["asset_0000"].status, "warning");
  assertEquals(result["asset_0000"].warnings.length, 2);
  assertEquals(result["asset_0000"].warnings[0].validatorId, "duplicate-name-and-image");
  assertEquals(
    result["asset_0000"].warnings[0].validationError.issues[0].message,
    "Name: asset_0000 has been detected as a duplicate."
  );
  assertEquals(result["asset_0000"].warnings[1].validatorId, "duplicate-name-and-image");
  assertEquals(
    result["asset_0000"].warnings[1].validationError.issues.length,
    1
  );
  assertEquals(
    result["asset_0000"].warnings[1].validationError.issues[0].message,
    "Image: adibou.png has been detected as a duplicate."
  );
  assertEquals(
    result["asset_0000"].warnings[1].validationError.issues[0].path,
    ["image"]
  );


  assertEquals(result["asset_0002"].status, "warning");
  assertEquals(result["asset_0002"].warnings.length, 2);
  assertEquals(result["asset_0002"].warnings[0].validatorId, "duplicate-name-and-image");
  assertEquals(
    result["asset_0002"].warnings[0].validationError.issues[0].message,
    "Name: asset_0000 has been detected as a duplicate."
  );

  assertEquals(result["asset_0002"].warnings[1].validatorId, "duplicate-name-and-image");
  assertEquals(
    result["asset_0002"].warnings[1].validationError.issues.length,
    1
  );
  assertEquals(
    result["asset_0002"].warnings[1].validationError.issues[0].message,
    "Image: adibou.png has been detected as a duplicate."
  );
  assertEquals(
    result["asset_0002"].warnings[1].validationError.issues[0].path,
    ["image"]
  );
});

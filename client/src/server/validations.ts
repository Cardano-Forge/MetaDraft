"use server";

import { Decorator } from "@ada-anvil/metadraft-validator";

import { KeyAttributesValidator } from "@ada-anvil/metadraft-validator";

const mapping = {
  KeyAttributesValidator: KeyAttributesValidator,
} as const;

export async function doStuff() {
  const metadatas = [
    {
      asset_name:
      {
        attributes: {
          foo: "bar",
          number_field: 1,
        },
      }
    }
  ];

  const validatorsReceivedFromFrontend: [keyof typeof mapping] = [
    "KeyAttributesValidator",
  ];

  const mainValidator = new Decorator("Main");
  for (const validator of validatorsReceivedFromFrontend) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadatas) {
    await mainValidator.Execute(
      Object.keys(asset_metadata)[0],
      Object.values(asset_metadata)[0],
      metadatas,
    );
  }

  const result = mainValidator.GetResults();

  return JSON.stringify(result, null, 2);
}

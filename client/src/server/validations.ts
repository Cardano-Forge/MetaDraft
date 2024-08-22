"use server";

import { Validator, mapping } from "@ada-anvil/metadraft-validator";

export async function doStuff(metadatas: any) {
  console.log(metadatas);
  const template: [keyof typeof mapping] = ["keyAttributesValidator"];

  const mainValidator = new Validator("Main");
  for (const validator of template) {
    mainValidator.Enable(new mapping[validator]());
  }

  for (const asset_metadata of metadatas) {
    mainValidator.Execute(
      Object.keys(asset_metadata)[0]!,
      Object.values(asset_metadata)[0],
      metadatas,
    );
  }

  const result = mainValidator.GetResults();

  return JSON.stringify(result, null, 2);
}

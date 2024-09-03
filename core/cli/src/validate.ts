import fs from "node:fs";
import {
  Validator,
  mapping,
  ReaderFactory,
} from "@ada-anvil/metadraft-validator";

import { loadTemplates } from "./load-rules.ts";
import { DIVIDER } from "./contstant.ts";
import { extractOptions } from "./utils.ts";
import { DataRead, Metadata } from "./types.ts";

export async function validate(
  metadataPath: string,
  templatePath: string,
  outputPath: string,
) {
  console.log(`Validating metadata at: ${metadataPath}`);
  console.log(`Using template at: ${templatePath}`);
  console.log(`Output report at: ${outputPath}`);
  // Add your validation logic here

  // 1. Load templates (from the txt file, the line that starts with # and empty lines are ignored)
  const rules = loadTemplates(templatePath);

  // 2. Build the validator from the validator package (CSV or JSON)
  const main = new Validator("Main");
  for (const validator of rules) {
    main.Enable(
      new mapping[validator.split(DIVIDER)[0] as keyof typeof mapping](
        extractOptions(validator),
      ),
    );
  }

  // 3. Load metadata (CSV or JSON)
  const reader = ReaderFactory.createReader(
    metadataPath.substring(metadataPath.lastIndexOf(".") + 1).toLowerCase(),
  );
  reader.Load(metadataPath);
  const metadatas: DataRead[] | null = reader.Read();

  if (!metadatas) {
    throw new Error("No metadatas loaded");
  }

  // 4. Run the validation on each asset in the metadata input
  console.time("timeAll");
  for (const metadata of metadatas) {
    main.Execute(
      (metadata as Metadata).assetName, // extract asset_name
      (metadata as Metadata).metadata, // extract payload
      metadatas,
    );
  }
  console.timeEnd("timeAll");

  console.time("timeOnce");
  main.ExecuteOnce(metadatas);
  console.timeEnd("timeOnce");

  const result = main.GetResults();

  // 4. Save the report on the local FS
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
}

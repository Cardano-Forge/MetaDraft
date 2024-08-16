import fs from "node:fs";
import {
  Decorator,
  mapping,
  ReaderFactory,
} from "@ada-anvil/metadraft-validator";

import { loadTemplates } from "./load-rules.ts";
import { Message, summarize } from "./report.ts";
import { DIVIDER } from "./contstant.ts";
import { extractOptions } from "./utils.ts";

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
  const main = new Decorator("Main");
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
  const metadatas: object[] = await reader.Load(metadataPath);

  // 4. Run the validation on each asset in the metadata input
  for (const metadata of metadatas) {
    console.debug(Object.keys(metadata)[0], Object.values(metadata));
    main.Execute(
      Object.keys(metadata)[0], // extract asset_name
      Object.values(metadata)[0], // extract payload
      metadatas,
    );
  }
  const result = main.GetResults();

  // 4. Save the report on the local FS
  fs.writeFileSync(
    outputPath,
    JSON.stringify(
      {
        summary: result.reduce(
          (
            acc: string[],
            message: { message: Message | undefined | object; state: string },
          ) => [
            ...acc,
            // Possible to have a nested message in case they are warnings (custom object)
            summarize(message),
          ],
          [],
        ),
        detailled: result,
      },
      null,
      2,
    ),
  );
}

#!/usr/bin/env node
// USAGE: ./metadraft validate -m metadata.json -t recommended.txt

import fs from "node:fs";
import path from "node:path";
import yargs from "yargs";

import { validate } from "./validate.ts";

// Define the validate command
yargs(Deno.args)
  .command(
    "validate",
    "Validate metadata using a template",
    (yargs: any) => {
      return yargs
        .option("m", {
          alias: "metadata-to-validate",
          describe: "Path to the metadata file",
          type: "string",
          demandOption: true,
          coerce: (arg: string) => {
            const filepath = path.resolve(arg);
            if (!fs.existsSync(filepath)) {
              throw new Error(`Metadata file not found: ${filepath}`);
            }
            return filepath;
          },
        })
        .option("t", {
          alias: "template",
          describe: "Path to the template file",
          type: "string",
          demandOption: true,
          coerce: (arg: string) => {
            const filepath = path.resolve(arg);
            if (!fs.existsSync(filepath)) {
              throw new Error(`Template file not found: ${filepath}`);
            }
            return filepath;
          },
        })
        .option("o", {
          alias: "output",
          describe: "Path to the output file",
          type: "string",
          default: `report.${new Date().getTime()}.json`,
          demandOption: false,
          coerce: (arg: string) => {
            const filepath = path.resolve(arg);
            if (fs.existsSync(filepath)) {
              throw new Error(`output file exists: ${filepath}`);
            }
            return filepath;
          },
        });
    },
    async (argv: {
      metadataToValidate: string;
      template: string;
      output: string;
    }) => {
      const metadataPath = argv.metadataToValidate;
      const templatePath = argv.template;
      const outputPath = argv.output;

      await validate(metadataPath, templatePath, outputPath);
    },
  )
  .demandCommand(1, "You need to specify at least one command to run the CLI")
  .strict()
  .showHelpOnFail(false)
  .help()
  .parse();

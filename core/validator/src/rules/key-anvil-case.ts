import { BaseValidator } from "../core.ts";

import { GetValidationOutput } from "../utils/getState.ts";

import type { KeyWithPath, StateOutput, ZodSafeParse } from "../utils/types.ts";

import { extractKeysWithPathsSplitAttributes } from "../utils/keys.ts";
import { metadataValidator } from "../utils/metadataChecks.ts";
import { logger } from "../utils/logger.ts";
import { isCamelCase, isTitleCase } from "../utils/casing.ts";
import { ZodError } from "zod";

/**
 * Enforces that metadata keys are in camel case format and inner keys in attributes are in Title Case format.
 *
 * @class KeyAnvilCase
 * @module Rules
 * @extends BaseValidator
 */
export class KeyAnvilCase extends BaseValidator {
  /**
   * Creates an instance of KeyAnvilCase validator.
   *
   * @param {object} [options] - The options for the validator.
   */
  constructor(options?: object) {
    const id = "key-anvil-casing";
    super(id, options);
  }

  /**
   * Executes the validation logic for anvil casing metadata keys.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    logger(`Executing ${this.id} with: `, metadata);
    return this.Logic(assetName, metadata, _metadatas);
  }

  /**
   * The main validation logic for ensuring metadata keys are anvil casing format.
   *
   * @param {string} assetName - The name of the asset being validated.
   * @param {unknown} metadata - The metadata to validate.
   * @param {unknown[]} _metadatas - An array of all metadatas, currently not used.
   * @returns {StateOutput} - An array of validation results.
   */
  Logic(
    assetName: string,
    metadata: unknown,
    _metadatas: unknown[]
  ): StateOutput {
    const isInvalid = metadataValidator(assetName, metadata, this.id);
    if (isInvalid) return isInvalid;

    const warnings = new ZodError([]);

    const otherKeysWarnings: KeyWithPath[] = [];
    const attributesWarnings: KeyWithPath[] = [];
    let message = "";

    const { otherKeys, attributesKeys } = extractKeysWithPathsSplitAttributes(
      metadata as object
    );

    otherKeys.forEach((key) => {
      if (!isCamelCase(key.key)) {
        otherKeysWarnings.push(key);
      }
    });

    if (otherKeysWarnings.length)
      message = "Some keys do not adhere to Camel Case formatting";

    attributesKeys.forEach((key) => {
      if (!isTitleCase(key.key)) {
        attributesWarnings.push(key);
      }
    });

    if (attributesWarnings.length) {
      message += message.length ? " and some" : "Some";

      message += " attribute's keys do not adhere to Title Case formatting";
    }

    const flaggedKeys = [...otherKeysWarnings, ...attributesWarnings];

    warnings.addIssues(
      flaggedKeys.map(({ path }) => ({
        code: "custom",
        message,
        path: path.split("."),
      }))
    );

    const hasWarning = warnings.issues.length > 0;

    const result: ZodSafeParse = {
      success: hasWarning,
      error: hasWarning ? warnings : undefined,
    };

    return GetValidationOutput(result, assetName, this.id);
  }
}

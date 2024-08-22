import { logger } from "./utils/logger.ts";
import type { IValidator, Result } from "./utils/types.ts";

/**
 * Base class for creating new validators.
 *
 * @class BaseValidator
 * @implements {IValidator}
 * @param {string} id - Unique identifier for tracking and debugging rules. Must be unique.
 * @param {unknown|undefined} [options={}] - Optional configuration options for the validator.
 *
 * @example
 * const myValidator = new BaseValidator("MY_VALIDATOR", { someOption: "value" });
 */
export class BaseValidator implements IValidator {
  readonly id: string;
  readonly options: unknown | undefined;

  constructor(id: string, options: unknown | undefined) {
    this.id = id;
    this.options = options || {};
  }

  /**
   * Executes the validation logic.
   *
   * @method Execute
   * @param {string} assetName - The name of the asset to validate.
   * @param {object} metadata - The metadata object to validate against.
   * @param {Array<object>} metadatas - The complete metadata array for context.
   * @returns {Result[]} An array of validation results.
   *
   * @throws Will throw an error if the method is not implemented.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    throw new Error("Method not implemented.");
  }
}

/**
 * Main validator class for running rules against a set of metadata.
 *
 * @class Validator
 * @implements {IValidator}
 * @param {string} id - Unique identifier for tracking and debugging purposes.
 *
 * @example
 * const validator = new Validator("MY_VALIDATOR");
 * validator.Enable(new MyCustomValidator());
 */
export class Validator implements IValidator {
  readonly id: string;
  private validations: Result[] = [];
  protected validators: IValidator[] = [];

  constructor(id: string) {
    this.id = id;
  }

  /**
   * Enables a custom validator.
   *
   * @method Enable
   * @param {IValidator} validator - The validator to enable.
   */
  Enable(validator: IValidator) {
    logger("Enabling validator:", validator.id);
    this.validators.push(validator);
  }

  /**
   * Executes the validation process with enabled validators.
   *
   * @method Execute
   * @param {string} assetName - The name of the asset to validate.
   * @param {object} metadata - The metadata object to validate against.
   * @param {Array<object>} metadatas - The complete metadata array for context.
   * @returns {Result[]} An array of validation results.
   */
  async Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Promise<Result[]> {
    logger("Execute in Validator", this.validators);
    if (this.validators.length === 0) {
      logger("no validators defined.");
      return [];
    }


    const validations = await Promise.all(chunkArray(this.validators, 6)
      .map(validators => Promise.all(validators
        .map(validator => validator.Execute(assetName, metadata, metadatas)))));

      this.validations = [
        ...this.validations,
        ...validations.flat(Infinity) as Result[],
      ];

    return this.validations;
  }

  /**
   * Retrieves the final summary of validation results.
   *
   * @method GetResults
   * @returns {Result[]} An array of validation results.
   */
  GetResults(): Result[] {
    return this.validations;
  }
}

function chunkArray(array: IValidator[], size: number):IValidator[][] {
  const chunks:IValidator[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

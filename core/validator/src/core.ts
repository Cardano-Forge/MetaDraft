import { logger } from "./utils/logger.ts";
import type { IMainValidator, IValidator, StateOutput } from "./utils/types.ts";

/**
 * Base class for creating new validators.
 *
 * @class BaseValidator
 * @implements {IValidator}
 * @param {string} id - Unique identifier for tracking and debugging rules. Must be unique.
 * @param {unknown|undefined} [options={}] - Optional configuration options for the validator.
 * @param {"once"|"all"} [type="all"] - The validation type, either "once" (run once per metadata array) or "all" (run against each metadata object). Default is "all".
 *
 * @example
 * const myValidator = new BaseValidator("MY_VALIDATOR", { someOption: "value" });
 */
export class BaseValidator implements IValidator {
  readonly id: string;
  readonly options: unknown | undefined;
  readonly type: "once" | "all";

  constructor(
    id: string,
    options: unknown | undefined,
    type: "once" | "all" = "all",
  ) {
    this.id = id;
    this.options = options || {};
    this.type = type;
  }

  /**
   * Executes the validation logic on a per asset basis.
   *
   * @method Execute
   * @param {string} _assetName - The name of the asset to validate.
   * @param {object} _metadata - The metadata object to validate against.
   * @param {Array<object>} _metadatas - The complete metadata array for context.
   * @returns {StateOutput} An object of validation results.
   *
   * @throws Will throw an error if the method is not implemented.
   */
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): StateOutput {
    throw new Error("Method not implemented.");
  }

  /**
   * Executes the validation logic for all assets at once.
   *
   * @method Execute
   * @param {Array<unknown>} _metadatas - The complete metadata array for context.
   * @param {Record<string, StateOutput>} _validations An object of validation results.
   * @returns {Record<string, StateOutput>} An object of validation results.
   *
   * @throws Will throw an error if the method is not implemented.
   */
  ExecuteOnce(
    _metadatas: unknown[],
    _validations: Record<string, StateOutput>,
  ): Record<string, StateOutput> {
    throw new Error("Method not implemented.");
  }
}

/**
 * Main validator class responsible for managing and executing validation rules against a set of metadata.
 *
 * @class Validator
 * @implements {IValidator}
 * @param {string} id - A unique identifier used for tracking and debugging purposes. Must be unique among all validators.
 * @param {"once"|"all"} [type="all"] - The validation type, either "once" (run once per metadata array) or "all" (run against each metadata object). Default is "all".
 *
 * @example
 * const validator = new Validator("MY_VALIDATOR", "once");
 * validator.Enable(new MyCustomValidator());
 */
export class Validator implements IMainValidator {
  readonly id: string;
  readonly type: "once" | "all";
  private validations: Record<string, StateOutput> = {};
  protected validators: IValidator[] = [];

  constructor(id: string, type: "once" | "all" = "all") {
    this.id = id;
    this.type = type;
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
   * Executes the validation process with enabled validators. Does not track the successes output.
   *
   * @method Execute
   * @param {string} assetName - The name of the asset to validate.
   * @param {object} metadata - The metadata object to validate against.
   * @param {Array<object>} metadatas - The complete metadata array for context.
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Record<string, StateOutput> {
    logger(
      "Execute in Validator",
      this.validators.filter((v) => v.type === "all"),
    );
    if (this.validators.length === 0) {
      logger("no validators defined.");
      return {};
    }

    for (const validator of this.validators.filter((v) => v.type === "all")) {
      const validations = validator.Execute(assetName, metadata, metadatas);

      // Build the validations output object.
      if (!this.validations[assetName]) {
        this.validations[assetName] = { status: "success", warnings: [], errors: [] };
      }
      if (validations.status !== "success") {
        this.validations[assetName].status = validations.status;
        if (validations.status === "error") {
          this.validations[assetName].errors.push(...validations.warnings);
        } else if(validations.status === "warning"){
          this.validations[assetName].warnings.push(...validations.warnings);
        }else if (
          this.validations[assetName].status !== "warning" &&
          this.validations[assetName].status !== "error"
        )
          this.validations[assetName].status = validations.status;
      }
    }

    return this.validations;
  }

  /**
   * Executes all validators with "once" type against a set of metadata.
   *
   * @method ExecuteOnce
   * @param {Array<object>} metadatas - The complete metadata array for context.
   * @returns {Record<string, StateOutput>} An object of validation results from all "once" validators.
   */
  ExecuteOnce(metadatas: unknown[]): Record<string, StateOutput> {
    logger(
      "Execute in Validator",
      this.validators.filter((v) => v.type === "once"),
    );
    if (this.validators.length === 0) {
      logger("no validators defined.");
      return {};
    }
    for (const validator of this.validators.filter((v) => v.type === "once")) {
      this.validations = validator.ExecuteOnce(metadatas, this.validations);
    }

    return this.validations;
  }

  /**
   * Retrieves the final summary of validation results.
   *
   * @method GetResults
   * @returns {Record<string, StateOutput>} An object of validation results.
   */
  GetResults(): Record<string, StateOutput> {
    return this.validations;
  }
}

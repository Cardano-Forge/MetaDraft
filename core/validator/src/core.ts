import type { IValidator, Result } from "./utils/types.ts";

/**
 * Class for creating new validators.
 * The ID must be unique, serving as an identifier for tracking and debugging rules.
 * The `execute` function must be implemented by the validator.
 */
export class BaseValidator implements IValidator {
  readonly id: string;
  readonly options: any;

  constructor(id: string, options: any) {
    this.id = id;
    this.options = options;
  }

  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Result[] {
    throw new Error("Method not implemented.");
  }
}

/**
 * This class serves as the main component for running rules against a set of metadata.
 * Custom validators must be enabled to create a template.
 * It requires an `assetName`, a `metadata` object, and the complete metadata array to check and validate a collection.
 * The `getResults` method returns a final summary of the validation process.
 */
export class Decorator implements IValidator {
  readonly id: string;
  private validations: Result[] = [];
  protected validators: IValidator[] = [];

  constructor(id: string) {
    this.id = id;
  }

  Enable(validator: IValidator) {
    console.debug("Enabling validator:", validator.id);
    this.validators.push(validator);
  }

  Execute(
    assetName: string,
    metadata: unknown,
    metadatas: unknown[],
  ): Result[] {
    console.debug("Execute in Decorator", this.validators);
    if (this.validators.length === 0) {
      console.debug("no validators defined.");
      return [];
    }

    for (const validator of this.validators) {
      console.debug("Validator", validator);
      this.validations = [
        ...this.validations,
        ...validator.Execute(assetName, metadata, metadatas),
      ];
    }

    return this.validations;
  }

  GetResults(): Result[] {
    return this.validations;
  }
}

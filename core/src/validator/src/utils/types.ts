import type { ZodError } from "zod";

export type FormatError = {
  message: string;
  errorCode: string;
  status: string | undefined;
  path: string;
};

export type FormattedError = {
  formErrors: [];
  fieldErrors: Record<
    string,
    Array<{
      message: string;
      errorCode: string;
      status: string;
      path: string;
    }>
  >;
};

const states = ["success", "warning", "error"] as const;
export type State = (typeof states)[number];

export type Result = {
  state: State;
  message: string | object | undefined;
  input: unknown;
  output?: unknown | undefined; // undefined when there is an error/warning
  assetName: string;
  validatorId: string;
};

export interface IValidator {
  id: string; // tracker
  Execute(
    _assetName: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Result[];
}

export type KeyWithPath = { key: string; path: string };
export type KeyWithPaths = KeyWithPath[];

export type DataRead = Record<string, unknown>;
export interface IReader {
  data: any;
  Load(pathOrData: string): Promise<any> | any;
  Read(): Promise<DataRead[]> | DataRead[];
}

export type CsvOptions = {
  delimiter: string;
  valueByType: boolean;
  subArray: [string, string];
  quotedField: boolean;
};

export type ZodStateError = { error: ZodError; success: boolean; data: Object };
export type StateError = { state: State; message: string; data: Object };

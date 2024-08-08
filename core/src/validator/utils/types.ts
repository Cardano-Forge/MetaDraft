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
  asset_name: string;
  validator_id: string;
};

export interface IValidator {
  id: string; // tracker
  Execute(
    _asset_name: string,
    _metadata: unknown,
    _metadatas: unknown[],
  ): Promise<Result[]>;
}

export type KeyWithPath = { key: string; path: string }[];

export type DatabaseResponse<T> = {
  success: boolean;
  data: T | undefined;
  error: string | undefined;
};

const formatSuccess = <T>(data: T) => ({
  success: true,
  data,
  error: undefined,
});

const formatError = (error: string) => ({
  success: false,
  data: undefined,
  error,
});

export { formatSuccess, formatError };

export function summarize(message: {
  message:
    | string
    | { message: string; warnings: { key: string; path: string }[] };
  state: string;
}) {
  const warnings = message.message.message
    ? `${message.message.warnings.map((w) => w.key).join(", ")}`
    : "";

  return `${message.state}: ${
    typeof message.message === "string"
      ? message.message
      : `${message.message.message}: ${warnings}`
  }`;
}

type Warning = {
  key: string;
  path: string;
};

export type Message = string | { message: string; warnings: Warning[] };

export function summarize({
  message,
  state,
}: {
  message: Message | undefined | object;
  state: string;
}): string {
  let warnings = "";
  let messageContent = "";

  if (typeof message === "string") {
    messageContent = message;
  } else if (message && "message" in message) {
    warnings = message.warnings.map((w) => w.key).join(", ");
    messageContent = `${message.message}: ${warnings}`;
  } else {
    messageContent = "Invalid message structure";
  }

  return `${state}: ${messageContent}`;
}

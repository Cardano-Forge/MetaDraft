import { type StateOutput } from "@ada-anvil/metadraft-validator";

export const getErrorCountMessage = (validations: StateOutput | undefined) => {
  let message = "";
  if (!validations) return message;
  const errorSize = validations.errors.length;
  const warningSize = validations.warnings.length;

  if (!!errorSize) message += `${errorSize} error${errorSize > 1 ? "s" : ""}`;
  if (!!message.length && !!warningSize) message += ", ";
  if (!!warningSize)
    message += `${warningSize} recommendation${warningSize > 1 ? "s" : ""}`;

  return message;
};

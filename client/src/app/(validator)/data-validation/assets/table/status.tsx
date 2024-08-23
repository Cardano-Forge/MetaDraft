import React from "react";
import { capitalize } from "~/lib/capitalize-word";
import { type Status } from "~/lib/types";
import { cn } from "~/lib/utils";

type StatusProps = {
  state: Status;
};

const variants: Record<Status, string> = {
  success: "bg-success/20 text-success",
  warning: "bg-warning/20 text-warning",
  error: "bg-destructive/20 text-destructive",
};

const text: Record<Status, string> = {
  success: "Valid",
  warning: "Error flag",
  error: "Error detected",
};

export default function Status({ state }: StatusProps) {
  return (
    <div
      className={cn(
        "w-fit items-center justify-center rounded-full px-4 py-2 font-semibold tracking-wide",
        variants[state],
      )}
    >
      {text[state]}
    </div>
  );
}

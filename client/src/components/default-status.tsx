import React from "react";

import type { Status } from "~/lib/types";
import { cn } from "~/lib/utils";

const variants: Record<Status, string> = {
  success: "bg-success/20 text-success disabled:opacity-100",
  warning: "bg-warning/20 text-warning",
  error: "bg-destructive/20 text-destructive",
  unchecked: "",
};

const text: Record<Status, string> = {
  success: "Valid",
  warning: "Error flag",
  error: "Error detected",
  unchecked: "Unchecked",
};

export default function Status({ state }: { state: Status }) {
  return (
    <div
      className={cn(
        "inline-flex w-fit items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold tracking-wide lg:h-10 lg:px-4 lg:py-2",
        variants[state],
      )}
    >
      {text[state]}
    </div>
  );
}

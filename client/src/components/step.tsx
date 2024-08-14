import React from "react";
import { cn } from "~/lib/utils";
import { Typography } from "./typography";
import CheckIcon from "~/icons/check.icon";

export type StepStatus = "active" | "done" | "next";

export type StepProps = {
  id: number;
  status: StepStatus;
  className?: string;
  children?: React.ReactNode;
};

const variant: Record<StepStatus, string> = {
  active: "bg-secondary",
  done: "bg-background",
  next: "bg-transparent border border-border/20 border-dashed",
};

export default function Step({ id, status, className, children }: StepProps) {
  const isDone = status === "done";
  const isActive = status === "active";
  const isNext = status === "next";
  return (
    <div
      className={cn(
        "flex w-full max-w-[224px] flex-col justify-between gap-2 rounded-3xl p-4",
        variant[status],
        className,
      )}
    >
      <div
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-inter",
          isActive && "bg-white font-bold text-background",
          isDone && "border border-border bg-transparent",
        )}
      >
        {isDone ? <CheckIcon className="h-4 w-4" /> : id}
      </div>
      <Typography
        as="regularText"
        className={cn(isActive && "font-semibold", isNext && "text-input/40")}
      >
        {children}
      </Typography>
    </div>
  );
}

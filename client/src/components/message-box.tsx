import React, { useState } from "react";
import { Typography } from "./typography";
import InformationCircle from "~/icons/information-circle";
import ExclamationIcon from "~/icons/exclamation.icon";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

const variants: Record<"warning" | "error", string> = {
  warning: "border-warning bg-warning/10",
  error: "border-destructive bg-destructive/10",
};

const titles: Record<"warning" | "error", JSX.Element> = {
  warning: (
    <div className="flex flex-row items-center gap-2">
      <InformationCircle className="text-warning" />
      <Typography className="font-semibold text-warning">
        Recommandation
      </Typography>
    </div>
  ),
  error: (
    <div className="flex flex-row items-center gap-2">
      <ExclamationIcon className="text-destructive" />
      <Typography className="font-semibold text-destructive">Error</Typography>
    </div>
  ),
};

export default function MessageBox({
  variant = "warning",
  text,
}: {
  text: string;
  variant?: keyof typeof variants;
}) {
  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => setShow(false);

  return (
    <div
      className={cn(
        "flex h-full origin-top flex-col rounded-xl border p-4 transition-all",
        "data-[state='hide']:h-0 data-[state='hide']:p-0 data-[state='hide']:opacity-0",
        "data-[state='show']:opacity-100",
        variants[variant],
      )}
      data-state={show ? "show" : "hide"}
    >
      <div className="flex flex-row items-center justify-between">
        {titles[variant]}
        <Button
          onClick={handleClose}
          variant={"ghost"}
          size={"sm"}
          className="text-xs font-normal tracking-wider text-white/40 hover:bg-transparent hover:text-white/70"
        >
          Clear
        </Button>
      </div>
      <Typography className="mr-16">{text}</Typography>
    </div>
  );
}

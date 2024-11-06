import React, { useState } from "react";

import { Typography } from "./typography";
import { Button } from "./ui/button";
import ExclamationIcon from "~/icons/exclamation.icon";
import InformationCircle from "~/icons/information-circle";
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
  children,
}: {
  children: React.ReactNode;
  variant?: keyof typeof variants;
}) {
  const [show, setShow] = useState<boolean>(true);

  const handleClose = () => setShow(false);

  if (!show) return null;

  return (
    <div
      className={cn("flex flex-col rounded-xl border p-4", variants[variant])}
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
      <div>{children}</div>
    </div>
  );
}

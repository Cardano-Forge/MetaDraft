import React from "react";
import { Typography } from "./typography";
import { cn } from "~/lib/utils";
import { formatThousands } from "~/lib/format-thousand";

import CheckIcon from "~/icons/check.icon";
import ClockIcon from "~/icons/clock.icon";
import DatabaseIcon from "~/icons/database.icon";
import ExclamationIcon from "~/icons/exclamation.icon";
import FlagIcon from "~/icons/flag.icon";

export type IconsStatsType = "default" | "error" | "warning" | "success";

const icons = {
  check: CheckIcon,
  clock: ClockIcon,
  database: DatabaseIcon,
  exclamation: ExclamationIcon,
  flag: FlagIcon,
};

export type StatProps = {
  icon: keyof typeof icons;
  stat: number;
  variant?: IconsStatsType;
  children?: React.ReactNode;
};

export default function Stat({
  icon,
  stat,
  variant = "default",
  children,
}: StatProps) {
  const Icon = icons[icon];
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <div
          className={cn(
            "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-secondary",
            variant === "error" && "bg-destructive/20 text-destructive",
            variant === "warning" && "bg-warning/20 text-warning",
            variant === "success" && "bg-success/20 text-success",
          )}
        >
          <Icon className="h-3 w-3 sm:h-4 sm:w-4" />
        </div>
        <Typography className="font-inter text-md sm:text-xl font-[700] tracking-wide">
          {formatThousands(stat)}
        </Typography>
      </div>
      <Typography as="mutedText">{children}</Typography>
    </div>
  );
}

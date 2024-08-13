import React from "react";
import { Typography } from "./typography";
import { cn } from "~/lib/utils";
import { formatThousands } from "~/lib/format-thousand";

export type IconsStatsType = "default" | "error" | "warning" | "success";

export type StatsProps = {
  icon: JSX.Element;
  stat: number;
  text: string;
  iconType?: IconsStatsType;
};

export default function Stats({
  icon,
  stat,
  text,
  iconType = "default",
}: StatsProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center gap-4">
        <div
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-full bg-secondary",
            iconType === "error" && "bg-destructive/20 text-destructive",
            iconType === "warning" && "bg-warning/20 text-warning",
            iconType === "success" && "bg-success/20 text-success",
          )}
        >
          {icon}
        </div>
        <Typography as="h6" className="font-inter text-xl font-[700] tracking-wide">
          {formatThousands(stat)}
        </Typography>
      </div>
      <Typography as="mutedText">{text}</Typography>
    </div>
  );
}

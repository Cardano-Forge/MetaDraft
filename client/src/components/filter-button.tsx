"use client";

import React, { useState } from "react";

import { Typography } from "./typography";
import { Button } from "./ui/button";
import SliderIcon from "~/icons/slider.icon";
import XIcon from "~/icons/x.icon";
import { cn } from "~/lib/utils";

export default function FilterButton() {
  const [active, setActive] = useState<boolean>(false);
  const handleChangeView = () => setActive((prev) => !prev);

  return (
    <Button
      variant={active ? "default" : "outline"}
      className={cn(
        "gap-4 rounded-lg p-6 text-border/50",
        active &&
          "border border-transparent bg-background text-border hover:bg-background/70",
      )}
      onClick={handleChangeView}
    >
      {active ? (
        <XIcon className="mx-[3px]" />
      ) : (
        <SliderIcon className="h-5 w-5" />
      )}
      <Typography
        as="largeText"
        className={cn("text-xl font-normal tracking-wide text-white")}
      >
        Filter
      </Typography>
    </Button>
  );
}

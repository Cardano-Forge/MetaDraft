"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
import { Typography } from "./typography";
import SortIcon from "~/icons/sort.icon";

// Not sure how we will use this for now,  maybe this should a select with option like sort be: asset name | id | status

export default function SortButton() {
  return (
    <Button
      variant={"outline"}
      className={"gap-4 rounded-lg p-6 text-border/50"}
      onClick={() => console.log("sorted by something")}
    >
      <SortIcon className="h-5 w-5" />
      <Typography
        as="largeText"
        className={cn("text-xl font-normal tracking-wide text-white")}
      >
        Sort
      </Typography>
    </Button>
  );
}

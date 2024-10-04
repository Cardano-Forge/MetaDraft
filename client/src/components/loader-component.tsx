import React from "react";

import { cn } from "~/lib/utils";

import Loader from "./loader";

export default function LoaderComponent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "container flex h-dvh flex-wrap place-content-center",
        className,
      )}
    >
      <Loader />
    </div>
  );
}

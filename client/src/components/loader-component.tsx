import React from "react";

import Loader from "./loader";
import { cn } from "~/lib/utils";


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

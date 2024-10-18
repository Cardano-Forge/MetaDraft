"use client";

import React, { useEffect } from "react";
import Image from "next/image";

import Header from "~/components/header";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

export default function Error({
  error,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  reset,
}: {
  error: Error;
  reset(): void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative min-h-screen">
      <Image
        fill
        alt="not-found"
        src="/404.png"
        className="absolute z-0"
        style={{ objectFit: "cover", overflow: "hidden" }}
      />
      <div className="fixed w-full">
        <Header />
      </div>
      <div className="fixed bottom-20 flex w-full flex-col items-center justify-center gap-4">
        <Typography as="code" className="uppercase">
          Something went wrong!
        </Typography>
        <div className="flex flex-row items-center justify-center">
          <Button size={"sm"} className="w-20" onClick={reset}>
            Try Again
          </Button>
        </div>
      </div>
    </main>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";

import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

import Assets from "./assets";
import PageSkeleton from "./page-skeleton";
import Validator from "./validator";

export default function DataValidation() {
  const [isLoading, setLoading] = useState<boolean>(false);
  if (isLoading) return <PageSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">NFTs data validation</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Validator handleLoading={setLoading} />
          <Button asChild>
            <Link title="Go to summary" href={"/summary"}>
              Validate this step
            </Link>
          </Button>
        </div>
      </div>
      <Assets />
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";


import Assets from "./assets";
import PageSkeleton from "./page-skeleton";
import Validator from "./validator";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

export default function DataValidation() {
  const [isLoading, setLoading] = useState<boolean>(false);
  if (isLoading) return <PageSkeleton />;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">NFTs data validation</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Ensure each NFT has the correct data.
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Validator handleLoading={setLoading} />
          <Button asChild>
            <Link href={"/summary"}>
              Next step
              <span className="sr-only">
                Complete this step and navigaton to next one: Summary
              </span>
            </Link>
          </Button>
        </div>
      </div>
      <Assets />
    </div>
  );
}

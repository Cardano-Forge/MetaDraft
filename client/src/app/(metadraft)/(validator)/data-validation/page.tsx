"use client";

import { useState } from "react";

import { Typography } from "~/components/typography";
import Assets from "./assets";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import Validator from "./validator";

import PageSkeleton from "./page-skeleton";

export default function DataValidation() {
  const router = useRouter();
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
          <Button title="Go to summary" onClick={() => router.push("/summary")}>
            Validate this step
          </Button>
        </div>
      </div>
      <Assets />
    </div>
  );
}

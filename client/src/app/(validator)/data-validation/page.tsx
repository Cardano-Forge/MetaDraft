"use client";

import { useState } from "react";

import { Typography } from "~/components/typography";
import Assets from "./assets";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import Validator from "./validator";
import LoaderComponent from "~/components/loader-component";

export default function DataValidation() {
  const router = useRouter();
  const [isValidating, setValidating] = useState<boolean>(false);

  if (isValidating)
    return <LoaderComponent />

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
          <Validator handleValidating={setValidating} />
          <Button onClick={() => router.push("/summary")}>
            Validate this step
          </Button>
        </div>
      </div>
      <Assets />
    </div>
  );
}

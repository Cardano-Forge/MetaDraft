"use client";

import { Typography } from "~/components/typography";
import Assets from "./assets";
import { Button } from "~/components/ui/button";

export default function DataValidation() {
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
          {/* <Button
            variant={"outline"}
            onClick={() => alert("should make this step in REMINDER state")}
          >
            Remind me later
          </Button> */}
          <Button onClick={() => alert("should make this step in DONE state")}>
            Validate this step
          </Button>
        </div>
      </div>
      <Assets />
    </div>
  );
}

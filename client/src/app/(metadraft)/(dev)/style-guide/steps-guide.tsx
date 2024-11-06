import React from "react";

import Step from "~/components/step";
import { Typography } from "~/components/typography";

export default function StepsGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Steps</Typography>
      <div className="flex w-full flex-row gap-8 rounded-xl border bg-[#444444] p-4">
        <Step id={1} status="done">
          Keys and values validation
        </Step>
        <Step id={2} status="active">
          NFTs data validation
        </Step>
        <Step id={3} status="next">
          Compare thumbnail and HR images
        </Step>
        <Step id={4} status="next">
          Final validation
        </Step>
      </div>
    </div>
  );
}

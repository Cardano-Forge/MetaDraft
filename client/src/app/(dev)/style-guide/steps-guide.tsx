import React from "react";
import Step from "~/components/steps";
import { Typography } from "~/components/typography";

export default function StepsGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Steps</Typography>
      <div className="flex w-full flex-row gap-8 rounded-xl border p-4 bg-[#444444]">
        <Step id={1} status="done" text="Keys and values validation" />
        <Step id={2} status="active" text="NFTs data validation" />
        <Step id={3} status="next" text="Compare thumbnail and HR images" />
        <Step id={4} status="next" text="Final validation" />
      </div>
    </div>
  );
}

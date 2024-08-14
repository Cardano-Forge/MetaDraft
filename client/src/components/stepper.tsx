"use client";
import Step from "./step";

export const Stepper = () => {
  return (
    <section className="flex py-5 gap-2">
      <Step id={1} status={"active"}>
        NFTs Data Validation
      </Step>
      <Step id={2} status={"next"}>
        Final validation
      </Step>
    </section>
  );
};

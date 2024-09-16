"use client";
import Step from "./step";

export const Stepper = () => {
  return (
    <nav className="container flex gap-2 py-5">
      <Step id={1}>Metadata Structure</Step>
      <Step id={2}>NFTs Data Validation</Step>
      <Step id={3}>Summary</Step>
    </nav>
  );
};

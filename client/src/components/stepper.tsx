"use client";
import Step from "./step";

export const Stepper = () => {
  return (
    <nav className="container flex gap-2 py-5">
      <Step id={1}>NFTs Data Validation</Step>
      <Step id={2}>Final validation</Step>
    </nav>
  );
};

import React from "react";
import { StepComponent, StepHeader } from "./step-components";

export default function DataValidation() {
  return (
    <StepComponent>
      <StepHeader title="NFTs data validation" step={3} status="error" />
      <div className="flex flex-row gap-4">
        <div>show status</div>
        <div>show each rules that asnt pass</div>
      </div>
    </StepComponent>
  );
}

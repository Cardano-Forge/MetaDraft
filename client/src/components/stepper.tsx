"use client";
import Joyride from "react-joyride";

import {
  joyrideNextButton,
  joyrideStyleOptions,
  stepExplaination,
} from "~/lib/joyride";

import Step from "./step";

export const Stepper = () => {
  return (
    <>
      <Joyride
        run
        steps={stepExplaination}
        continuous
        showSkipButton
        showProgress
        styles={{ options: joyrideStyleOptions, buttonNext: joyrideNextButton }}
      />
      <nav className="container flex gap-2 py-5">
        <Step id={1} className="metadata-schema-step">
          Metadata Structure
        </Step>
        <Step id={2} className="rules-selection-step">
          Rules Selection
        </Step>
        <Step id={3} className="data-validation-step">
          NFTs Data Validation
        </Step>
        <Step id={4} className="summary-step">
          Summary
        </Step>
      </nav>
    </>
  );
};

"use client";

import React from "react";
import Joyride, { type CallBackProps, ACTIONS, STATUS } from "react-joyride";

import Step from "./step";
import {
  joyrideBackButton,
  joyrideCloseButton,
  joyrideNextButton,
  joyrideSkipButton,
  joyrideSpotlight,
  joyrideStyleOptions,
  explainationSteps,
} from "~/lib/joyride";

export const Stepper = () => {
  const [run, setRun] = React.useState(!localStorage.getItem("guideOff"));

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status } = data;

    if (action === ACTIONS.SKIP || status === STATUS.FINISHED) {
      const today = new Date();
      today.setFullYear(today.getFullYear() + 1);
      localStorage.setItem("guideOff", "true");
      setRun(false);
    }
  };

  return (
    <>
      <Joyride
        run={run}
        steps={explainationSteps}
        continuous
        showSkipButton
        showProgress
        callback={handleJoyrideCallback}
        styles={{
          options: joyrideStyleOptions,
          buttonNext: joyrideNextButton,
          buttonBack: joyrideBackButton,
          buttonSkip: joyrideSkipButton,
          buttonClose: joyrideCloseButton,
          spotlight: joyrideSpotlight,
        }}
        locale={{
          last: "Finish Tour",
          next: "Next Step",
          back: "Previous",
          close: "Close",
        }}
      />
      <nav className="container flex gap-3 py-5">
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

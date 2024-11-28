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
import { useTutorial } from "~/providers/tutorial.provider";

export const Stepper = () => {
  const { active, handleActive } = useTutorial();

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status } = data;

    if (action === ACTIONS.SKIP || status === STATUS.FINISHED) {
      localStorage.setItem("guideOff", "true");
      handleActive(false);
    }
  };

  return (
    <>
      <Joyride
        run={active}
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

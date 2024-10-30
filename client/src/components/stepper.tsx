"use client";

import React from "react";
import Joyride, { type CallBackProps, ACTIONS, STATUS } from "react-joyride";

import {
  joyrideBackButton,
  joyrideCloseButton,
  joyrideNextButton,
  joyrideSkipButton,
  joyrideSpotlight,
  joyrideStyleOptions,
  explainationSteps,
} from "~/lib/joyride";

import Step from "./step";

const cookieId = "guideOff";

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift();
}

export const Stepper = () => {
  const [run, setRun] = React.useState(!getCookie(cookieId));

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { action, status } = data;

    if (action === ACTIONS.SKIP || status === STATUS.FINISHED) {
      const today = new Date();
      today.setFullYear(today.getFullYear() + 1);
      document.cookie = `${cookieId}=true; expires=${today.toUTCString()}; path=/`;
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

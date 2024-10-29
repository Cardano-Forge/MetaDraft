import { type CSSProperties } from "react";
import type { Step, StylesOptions } from "react-joyride";

export const joyrideStyleOptions = {
  arrowColor: "#2d2c30",
  backgroundColor: "#2d2c30",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.5)",
  primaryColor: "#55ce7d",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "white",
  zIndex: 100,
  width: 380,
} satisfies StylesOptions;

export const joyrideNextButton = {
  borderRadius: "1em",
  padding: "0.5em 1em",
} satisfies CSSProperties;

export const landingPageSteps: Step[] = [
  {
    target: ".my-first-step",
    content:
      "This button allows you to create a new project from scratch, giving you full control to build all your metadata",
    placement: "top",
  },
  {
    target: ".my-second-step",
    content:
      "This button lets you upload a project. Your file must be in .json format and properly structured.",
  },
  {
    target: ".my-third-step",
    content:
      "Your metadata should follow the CIP-25 format for Cardano. Only two fields are required: name and image. For use in our tool, the format should include assetName and metadata: { name, image }",
  },
];

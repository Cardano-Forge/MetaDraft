import { type Step } from "react-joyride";

export * from "./css";

export const explainationSteps: Step[] = [
  {
    target: ".metadata-schema-step",
    content:
      "In this first step, you’ll design your metadata schema. For each key, set a default value that will apply across your assets. Remember to save your schema before moving on to the next step!",
    placement: "bottom",
  },
  {
    target: ".rules-selection-step",
    content:
      "In this step, select the validation rules for your metadata, such as checking for proper casing in keys. These rules help ensure consistency and accuracy across your data.",
    placement: "bottom",
  },
  {
    target: ".data-validation-step",
    content:
      "In this step, you can review and validate all metadata, checking for any flagged or detected errors. For any issues, go to the asset page to make corrections, then re-validate to ensure everything is accurate.",
    placement: "bottom",
  },
  {
    target: ".summary-step",
    content:
      "Finally, review the summary of your metadata. Here, you'll see attribute distributions, the selected validation rules, and options to export your metadata.",
    placement: "bottom",
  },
];

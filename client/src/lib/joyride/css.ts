import { type CSSProperties } from "react";
import type { StylesOptions } from "react-joyride";

export const joyrideStyleOptions = {
  arrowColor: "#2d2c30",
  backgroundColor: "#2d2c30",
  beaconSize: 36,
  overlayColor: "rgba(0, 0, 0, 0.7)",
  primaryColor: "#55ce7d",
  spotlightShadow: "0 0 15px rgba(0, 0, 0, 0.5)",
  textColor: "white",
  zIndex: 100,
  width: 380,
} satisfies StylesOptions;

const baseButton = {
  backgroundColor: "transparent",
  border: 0,
  borderRadius: 0,
  color: "#555",
  cursor: "pointer",
  fontSize: 16,
  lineHeight: 1,
  padding: 8,
  WebkitAppearance: "none",
} satisfies CSSProperties;

export const joyrideNextButton = {
  ...baseButton,
  borderRadius: "1em",
  padding: "0.5em 1em",
  marginLeft: "0.5em",
  backgroundColor: "#55ce7d",
  color: "#ffffff",
} satisfies CSSProperties;

export const joyrideBackButton = {
  ...baseButton,
  marginLeft: "auto",
  marginRight: 5,
  color: "rgba(255, 255, 255, 0.5)",
} satisfies CSSProperties;

export const joyrideCloseButton = {
  ...baseButton,
  color: "rgba(255, 255, 255, 0.5)",
  height: 14,
  padding: 15,
  position: "absolute",
  right: 0,
  top: 0,
  width: 14,
} satisfies CSSProperties;

export const joyrideSkipButton = {
  ...baseButton,
  color: "#ffc37a",
  fontSize: 14,
} satisfies CSSProperties;

export const joyrideSpotlight = {
  position: "absolute",
  borderRadius: "1em",
  backgroundColor: "gray",
} satisfies CSSProperties;

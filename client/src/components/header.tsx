"use client";

import React from "react";

import ClearProjectButton from "./clear-project-button";
import Feedback from "./feedback";
import Logo from "./logo";
import { Button } from "./ui/button";
import { useTutorial } from "~/providers/tutorial.provider";
import RadioCheckIcon from "~/icons/radio-check.icon";

export default function Header() {
  const { active, handleActive } = useTutorial();

  return (
    <div className="container flex flex-row items-center justify-between py-8">
      <Logo />

      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        {!active && (
          <Button
            size={"icon"}
            variant={"ghost"}
            className="flex flex-row gap-2 text-success"
            onClick={() => {
              localStorage.removeItem("guideOff");
              handleActive(true);
            }}
            title="Reset tutorial"
          >
            <RadioCheckIcon />
          </Button>
        )}
        <Feedback /> <ClearProjectButton className="w-[151px] md:w-fit" />
      </div>
    </div>
  );
}

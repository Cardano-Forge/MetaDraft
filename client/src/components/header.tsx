import React from "react";
import Feedback from "./feedback";
import Logo from "./logo";
import ClearProjectButton from "./clear-project-button";

export default function Header() {
  return (
    <div className="container flex flex-row items-center justify-between py-8">
      <Logo />
      <div className="flex flex-col items-center justify-end gap-2 md:flex-row">
        <Feedback /> <ClearProjectButton className="w-[151px] md:w-fit" />
      </div>
    </div>
  );
}

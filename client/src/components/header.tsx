import React from "react";
import Feedback from "./feedback";
import Logo from "./logo";
import ClearProjectButton from "./clear-project-button";

export default function Header() {
  return (
    <div className="container flex flex-row items-center justify-between py-8">
      <Logo />{" "}
      <div className="flex items-center gap-2">
        <Feedback /> <ClearProjectButton />
      </div>
    </div>
  );
}

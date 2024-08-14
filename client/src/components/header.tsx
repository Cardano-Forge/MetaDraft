import React from "react";
import Feedback from "./feedback";
import Logo from "./logo";

export default function Header() {
  return (
    <div className="container flex flex-row items-center justify-between py-8">
      <Logo /> <Feedback />
    </div>
  );
}

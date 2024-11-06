import React from "react";

import { Button } from "./ui/button";
import NoteIcon from "~/icons/note.icon";

const GITHUB_ISSUE = "https://github.com/Cardano-Forge/MetaDraft/issues/new";

export default function Feedback() {
  return (
    <a href={GITHUB_ISSUE} target="_blank" rel="noopener noreferrer">
      <Button variant={"secondary"} icon={<NoteIcon />} className="md:px-8">
        Send Feedback
        <span className="sr-only">
          Send feedback by creating an issue in the Github repository.
        </span>
      </Button>
    </a>
  );
}

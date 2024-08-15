import React from "react";
import DocumentAddIcon from "~/icons/document-add.icon";
import { Typography } from "./typography";
import { Button } from "./ui/button";

export default function CreateProjectButton() {
  // TODO - Action of creating a project (milestones 4)
  return (
    <Button
      variant={"secondary"}
      className="flex h-[452px] w-full min-w-[300px] flex-col items-center justify-center gap-8 rounded-2xl bg-card hover:bg-card/70"
      disabled
    >
      <DocumentAddIcon />
      <div className="flex flex-col items-center justify-center gap-4">
        <Typography as={"largeText"} className="font-inter text-2xl">
          Create a new project
        </Typography>
        <Typography as={"mutedText"} className="font-normal">
          Lorem ipsum dolor site amet
        </Typography>
      </div>
    </Button>
  );
}

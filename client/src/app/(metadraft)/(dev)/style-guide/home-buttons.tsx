import React from "react";
import CreateProjectButton from "~/components/create-project-button";
import { Typography } from "~/components/typography";
import { UploadProjectButton } from "~/components/upload-project-button";

export default function HomeButtons() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Home Buttons</Typography>
      <div className="flex w-full flex-col-reverse items-center justify-center gap-8 rounded-xl border p-4 lg:flex-row">
        <CreateProjectButton />
        <UploadProjectButton />
      </div>
    </div>
  );
}

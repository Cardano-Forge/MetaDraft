import React from "react";
import StepComponent from "./step-component";
import { Typography } from "~/components/typography";
import { useActiveProject } from "~/providers/active-project.provider";
import { type ProjectCollection } from "~/lib/types";
import CheckCircleIcon from "~/icons/check-circle.icon";

export default function MetadataStructure() {
  const activeProject = useActiveProject();
  const project = activeProject?.toJSON() as ProjectCollection;

  return (
    <StepComponent>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <Typography className="text-white/50">Step 1</Typography>
          <Typography as="h4">Metadata strucutre</Typography>
        </div>
        <Typography className="flex flex-row items-center gap-4 text-success tracking-wide">
          Validated <CheckCircleIcon className="h-8 w-8" />
        </Typography>
      </div>
    </StepComponent>
  );
}

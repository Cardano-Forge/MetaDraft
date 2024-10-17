"use client";

import React from "react";
import { Typography } from "./typography";
import Stat from "./stat";
import { useActiveProject } from "~/providers/active-project.provider";
import { ProjectCollection } from "~/lib/types";

export const Status = () => {
  const activeProject = useActiveProject();
  const project = activeProject?.toJSON() as ProjectCollection;

  if (!activeProject || !project)
    return (
      <div className="flex w-full items-center justify-center">
        No active project
      </div>
    );

  return (
    <header className="container flex flex-wrap justify-between gap-2">
      <Typography as="h1">{project.name}</Typography>
      <div className="mt-4 flex flex-wrap gap-8">
        <Stat icon="database" stat={project.nfts}>
          NFTs in this collection
        </Stat>
        <Stat icon="clock" stat={project.unchecked}>
          NFTs unchecked
        </Stat>
        <Stat icon="exclamation" stat={project.errorsDetected} variant="error">
          Errors detected
        </Stat>
        <Stat icon="flag" stat={project.errorsFlagged} variant="warning">
          Errors flagged
        </Stat>
        <Stat icon="check" stat={project.valids} variant="success">
          Marked as valid
        </Stat>
      </div>
    </header>
  );
};

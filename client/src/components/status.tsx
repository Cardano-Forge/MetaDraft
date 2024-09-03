"use client";

import React from "react";
import { Typography } from "./typography";
import Stat from "./stat";
import { useActiveProject } from "~/providers/active-project.provider";
import { useRxData } from "rxdb-hooks";
import type { Project } from "~/lib/db/types";
import Loader from "./loader";

export const Status = () => {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<Project>("project", (collection) =>
    collection.findByIds(["project"]),
  );

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const project = result[0]?._data;

  if (!activeProject || !project) return <div>No data found.</div>;

  return (
    <header className="container flex flex-wrap justify-between gap-2">
      <Typography as="h1">{project.name}</Typography>
      <div className="flex flex-wrap gap-8">
        <Stat icon="database" stat={project.nfts}>
          NFTs in this collection
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

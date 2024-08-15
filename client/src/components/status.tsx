"use client";

import React from "react";
import { Typography } from "./typography";
import Stat from "./stat";

export const Status = () => {
  //TODO get data from offline db
  const data = {
    name: "Funplastic",
    stats: {
      nfts: 10_000,
      unchecked: 9_950,
      errorsDetected: 2,
      errorsFlagged: 3,
      valid: 50,
    },
  };
  return (
    <header className="container flex flex-wrap justify-between gap-2">
      <Typography as="h1">{data.name}</Typography>
      <div className="flex flex-wrap gap-8">
        <Stat icon="database" stat={data.stats.nfts}>
          NFTs in this collection
        </Stat>
        <Stat icon="clock" stat={data.stats.unchecked}>
          NFTs unchecked
        </Stat>
        <Stat
          icon="exclamation"
          stat={data.stats.errorsDetected}
          variant="error"
        >
          Errors detected
        </Stat>
        <Stat icon="flag" stat={data.stats.errorsFlagged} variant="warning">
          Errors flagged
        </Stat>
        <Stat icon="check" stat={data.stats.valid} variant="success">
          Marked as valid
        </Stat>
      </div>
    </header>
  );
};

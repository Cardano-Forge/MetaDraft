import React from "react";
import Stat from "~/components/stat";
import { Typography } from "~/components/typography";

export default function StatsGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Stats</Typography>
      <div className="flex w-full flex-row gap-8 rounded-xl border p-4">
        <Stat icon="database" stat={10_000}>
          NFTs in this collection
        </Stat>
        <Stat icon="clock" stat={9_950}>
          NFTs unchecked
        </Stat>
        <Stat icon="exclamation" stat={2} variant="error">
          Errors detected
        </Stat>
        <Stat icon="flag" stat={3} variant="warning">
          Errors flagged
        </Stat>
        <Stat icon="check" stat={50} variant="success">
          Marked as valid
        </Stat>
      </div>
    </div>
  );
}

import React from "react";
import Stats from "~/components/stats";
import { Typography } from "~/components/typography";
import CheckIcon from "~/icons/check.icon";
import ClockIcon from "~/icons/clock.icon";
import DatabaseIcon from "~/icons/database.icon";
import ExclamationIcon from "~/icons/exclamation.icon";
import FlagIcon from "~/icons/flag.icon";

export default function StatsGuide() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Stats</Typography>
      <div className="flex w-full flex-row gap-8 rounded-xl border p-4">
        <Stats
          icon={<DatabaseIcon className="h-4 w-4" />}
          stat={10_000}
          text="NFTs in this collection"
        />
        <Stats
          icon={<ClockIcon className="h-4 w-4" />}
          stat={9_950}
          text="NFTs unchecked"
        />
        <Stats
          icon={<ExclamationIcon className="h-[16px] w-[18px]" />}
          stat={2}
          text="Errors detected"
          iconType="error"
        />
        <Stats
          icon={<FlagIcon className="h-4 w-4" />}
          stat={3}
          text="Errors flagged"
          iconType="warning"
        />
        <Stats
          icon={<CheckIcon className="h-4 w-4" />}
          stat={50}
          text="Marked as valid"
          iconType="success"
        />
      </div>
    </div>
  );
}

import React from "react";
import Stat from "~/components/stat";
import { Typography } from "~/components/typography";
import { useValidations } from "~/lib/hooks/use-validations";

export default function ValidatorStats() {
  const { getKeyCount } = useValidations();
  const keys = getKeyCount();
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background p-6">
      <Typography as="h3">Validator detected</Typography>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {Object.keys(keys.errors).map((key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-4 rounded-xl border border-destructive p-4"
          >
            <Stat
              icon="exclamation"
              stat={keys.errors[key]?.count ?? 0}
              variant="error"
              className="flex-row items-center"
            >
              {key}
            </Stat>
          </div>
        ))}
        {Object.keys(keys.warnings).map((key) => (
          <div
            key={key}
            className="flex flex-col items-center gap-4 rounded-xl border border-warning p-4"
          >
            <Stat
              icon="flag"
              stat={keys.warnings[key]?.count ?? 0}
              variant="warning"
              className="flex-row items-center"
            >
              {key}
            </Stat>
            <div className="w-full border-b border-border/50" />
            <Typography className="max-w-[300px] text-warning">
              {keys.warnings[key]?.message}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
}

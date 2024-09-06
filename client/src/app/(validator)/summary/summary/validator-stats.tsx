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
      <div className="flex flex-wrap gap-10">
        {Object.keys(keys.errors).map((key) => (
          <Stat
            key={key}
            icon="flag"
            stat={keys.errors[key]!}
            variant="warning"
          >
            {key}
          </Stat>
        ))}
        {Object.keys(keys.warnings).map((key) => (
          <Stat
            key={key}
            icon="flag"
            stat={keys.warnings[key]!}
            variant="warning"
          >
            {key}
          </Stat>
        ))}
      </div>
    </div>
  );
}

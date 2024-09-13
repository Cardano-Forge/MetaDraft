import React from "react";
import { Typography } from "~/components/typography";
import type { Structure } from "~/lib/types";

export default function FormSection({ structure }: { structure: Structure }) {
  console.log(structure);
  if (!structure) return <div>false</div>;

  return (
    <div className="flex flex-col rounded-2xl bg-card">
      <div className="flex flex-row items-center justify-between rounded-t-2xl bg-secondary p-6">
        <Typography as="smallText" className="text-white/50">
          KEYS NAME
        </Typography>
        <Typography as="smallText" className="text-white/50">
          QUICK ACTIONS
        </Typography>
      </div>
      <div className="flex flex-col gap-4 p-4">
        {renderStructure(structure)}
      </div>
    </div>
  );
}

const renderStructure = (structure: Structure): JSX.Element => {
  return (
    <div className="flex flex-col gap-4">
      {Object.keys(structure).map((key) => {
        console.log(key);
        if (typeof structure[key] === "string")
          return (
            <div key={key}>
              {key}: {structure[key]}s
            </div>
          );
        console.log(key);
        if (typeof structure[key] === "object") {
          return renderStructure(structure[key]);
        }

        return null;
      })}
    </div>
  );
};

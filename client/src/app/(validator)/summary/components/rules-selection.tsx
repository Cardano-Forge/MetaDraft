import React from "react";
import { StepComponent, StepHeader } from "./step-components";
import { Typography } from "~/components/typography";
import { useRxData } from "rxdb-hooks";
import { type RulesCollection } from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";
import LoaderComponent from "~/components/loader-component";
import { hyphenToTitleCase } from "~/lib/hyphen-to-title-case";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { chunk } from "~/lib/chunk";
import CodeIcon from "~/icons/code.icon";

export default function RulesSelection() {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<RulesCollection>(
    "rules",
    (collection) => collection.findByIds([activeProject?.id ?? ""]),
  );

  if (isFetching) return <LoaderComponent />;

  const rules: RulesCollection | undefined = result.map(
    (doc) => doc.toJSON() as RulesCollection,
  )[0];

  if (!rules) return null;

  return (
    <StepComponent>
      <StepHeader title="Rules selection" step={2} />
      <Accordion type="single" collapsible>
        <AccordionItem value="rules">
          <AccordionTrigger className="hover:no-underline">
            <div className="ml-2 flex flex-row items-center gap-4 text-white/60">
              <div className="items-center justify-center rounded-full border border-white/60 p-2">
                <CodeIcon className="h-4 w-4" />
              </div>
              {`${rules.rules.length} Rule(s) selected for validation`}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-row gap-10 rounded-xl bg-card p-4">
            {chunk(rules.rules, 4).map((rules, i) => (
              <ul key={`${i}`}>
                {rules.map((rule) => (
                  <li key={rule}>
                    <Typography>• {hyphenToTitleCase(rule)}</Typography>
                  </li>
                ))}
              </ul>
            ))}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </StepComponent>
  );
}

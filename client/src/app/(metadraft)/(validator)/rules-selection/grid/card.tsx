import React from "react";
import { useRxCollection } from "rxdb-hooks";
import { ImageWithFallback } from "~/components/image-with-fallback";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import InformationCircle from "~/icons/information-circle";
import { camelCaseToTitleCase } from "~/lib/camel-case-to-title-case";
import { RULES_DESCRIPTION, type Rule } from "~/lib/rules";
import { type RulesCollection } from "~/lib/types";
import { cn } from "~/lib/utils";

export default function Card({
  rule,
  rules,
}: {
  rule: Rule;
  rules: RulesCollection;
}) {
  const rulesCollection = useRxCollection<RulesCollection>("rules");

  const handleChange = async (checked: boolean, key: Rule) => {
    try {
      const newRules = { ...rules };
      if (checked) {
        newRules.rules.push(key);
      } else {
        newRules.rules = newRules.rules.filter((k) => k !== key);
      }
      await rulesCollection?.upsert(newRules);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className={cn(
        "max-h-500 flex flex-col rounded-2xl border-2 border-white/20 bg-card hover:border-white",
        rules.rules.includes(rule) && "border-success hover:border-success/50",
      )}
      role="button"
      onClick={() => handleChange(!rules.rules.includes(rule), rule)}
    >
      <div className="relative">
        <ImageWithFallback src={"/rule_card.png"} className="rounded-2xl" />
        <Typography
          as="largeText"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center text-xl"
        >
          {camelCaseToTitleCase(rule)}
        </Typography>
        <div className="absolute right-2 top-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"icon"} variant={"ghost"}>
                  <InformationCircle />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-96 text-balance border-white/50 p-4">
                <Typography>{RULES_DESCRIPTION[rule]}</Typography>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}

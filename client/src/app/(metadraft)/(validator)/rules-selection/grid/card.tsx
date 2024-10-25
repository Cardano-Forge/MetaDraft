import React from "react";
import { useRxCollection } from "rxdb-hooks";
import { ImageWithFallback } from "~/components/image-with-fallback";
import { Typography } from "~/components/typography";
import { ScrollArea } from "~/components/ui/scroll-area";
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
        "max-h-500 flex flex-col rounded-xl border-2 border-white/20 bg-card hover:border-white",
        rules.rules.includes(rule) && "border-success hover:border-warning",
      )}
      role="button"
      onClick={() => handleChange(!rules.rules.includes(rule), rule)}
    >
      <div className="relative">
        <ImageWithFallback src={"/rule_bg.png"} />
        <Typography
          as="largeText"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-center"
        >
          {camelCaseToTitleCase(rule)}
        </Typography>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <ScrollArea className="h-52 pr-3">
          <Typography className="text-ellipsis">
            {RULES_DESCRIPTION[rule]}
          </Typography>
        </ScrollArea>
      </div>
    </div>
  );
}

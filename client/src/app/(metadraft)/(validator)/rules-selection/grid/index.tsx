import { Typography } from "~/components/typography";
import Card from "./card";
import { type Rule } from "~/lib/rules";
import type { RulesCollection } from "~/lib/types";

export default function GridRules({
  keys,
  rules,
}: {
  keys: Rule[];
  rules: RulesCollection;
}) {
  if (keys.length === 0)
    return (
      <div className="flex p-4">
        <Typography as="code">No results found</Typography>
      </div>
    );

  return (
    <div className="grid grid-flow-row grid-cols-3 gap-4 px-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {keys.map((key) => (
        <Card key={key} rule={key} rules={rules} />
      ))}
    </div>
  );
}

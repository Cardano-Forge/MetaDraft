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
  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {keys.map((key) => (
        <Card key={key} rule={key} rules={rules} />
      ))}
    </div>
  );
}

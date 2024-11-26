import { useRxCollection } from "rxdb-hooks";

import { Label } from "~/components/ui/label";
import { Switch } from "~/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useToast } from "~/hooks/use-toast";
import { camelCaseToTitleCase } from "~/lib/camel-case-to-title-case";
import { type Rule, RULES_DESCRIPTION } from "~/lib/rules";
import type { RulesCollection } from "~/lib/types";

export default function TableRules({
  keys,
  rules,
}: {
  keys: Rule[];
  rules: RulesCollection;
}) {
  const { toast } = useToast();
  const rulesCollection = useRxCollection<RulesCollection>("rules");

  const handleChange = async (checked: boolean, key: Rule) => {
    try {
      const newRules = { ...rules };
      if (checked) {
        newRules.rules.push(key);
        toast({
          title: `Activated: ${key}`,
          description: new Date().toDateString(),
          className: "border-success",
        });
      } else {
        newRules.rules = newRules.rules.filter((k) => k !== key);
        toast({
          title: `Removed: ${key}`,
          description: new Date().toDateString(),
          className: "border-destructive",
        });
      }
      await rulesCollection?.upsert(newRules);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Table>
      <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
        <TableRow>
          <TableHead className="w-52">Rule Name</TableHead>
          <TableHead>Definition</TableHead>
          <TableHead className="w-20">Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
        {keys.map((key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">
              <Label>{camelCaseToTitleCase(key)}</Label>
            </TableCell>
            <TableCell>{RULES_DESCRIPTION[key].short}</TableCell>
            <TableCell>
              <Switch
                checked={rules.rules.includes(key)}
                onCheckedChange={(checked) => handleChange(checked, key)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

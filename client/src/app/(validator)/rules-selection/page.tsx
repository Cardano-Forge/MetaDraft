import { Typography } from "~/components/typography";
import { mapping } from "@ada-anvil/metadraft-validator";
import { ruleSet } from "~/lib/constant";
import { RULES_DESCRIPTION, type RulesId } from "~/lib/rules";
import { Switch } from "~/components/ui/switch";
import { Label } from "~/components/ui/label";
import { camelCaseToTitleCase } from "~/lib/camel-case-to-title-case";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function RulesPage() {
  const keys = Object.keys(mapping) as RulesId[];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Rules Selection</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          {/* Add buttons here */}
        </div>
      </div>

      <div className="rounded-xl border border-white bg-secondary">
        <Table className="rounded-2xl">
          <TableHeader className="h-14 rounded-2xl bg-background hover:bg-background">
            <TableRow className="rounded-2xl bg-background hover:bg-background">
              <TableHead className="min-w-[150px] rounded-tl-2xl">Rules Name</TableHead>
              <TableHead>Definition</TableHead>
              <TableHead className="rounded-tr-2xl">Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key} className="bg-background/50">
                <TableCell className="font-medium">
                  <Label>{camelCaseToTitleCase(key)}</Label>
                </TableCell>
                <TableCell>{RULES_DESCRIPTION[key]}</TableCell>
                <TableCell>
                  <Switch checked={ruleSet.includes(key)} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

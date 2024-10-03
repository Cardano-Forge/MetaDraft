"use client";

import React, { useEffect, useState } from "react";

import { type Rule, RULES_DESCRIPTION } from "~/lib/rules";
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
import { type RulesCollection } from "~/lib/types";
import { useRxCollection, useRxData } from "rxdb-hooks";
import LoaderComponent from "~/components/loader-component";

export default function Content() {
  const [keys, setKeys] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const rulesCollection = useRxCollection<RulesCollection>("rules");
  const { result, isFetching } = useRxData<RulesCollection>(
    "rules",
    (collection) => collection.find(),
  );

  const fetchKeys = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/keys");
      const data = (await response.json()) as { keys: Rule[] };
      setKeys(data.keys);
    } catch (error) {
      console.error("Failed to fetch keys:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    void fetchKeys();
  }, []);

  if (loading || isFetching) return <LoaderComponent />;

  const rules: RulesCollection | undefined = result.map(
    (doc) => doc.toJSON() as RulesCollection,
  )[0];

  if (!rules) return null;

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
    <Table>
      <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
        <TableRow>
          <TableHead className="w-40">Rule Name</TableHead>
          <TableHead>Definition</TableHead>
          <TableHead>Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
        {keys.map((key) => (
          <TableRow key={key}>
            <TableCell className="font-medium">
              <Label>{camelCaseToTitleCase(key)}</Label>
            </TableCell>
            <TableCell>{RULES_DESCRIPTION[key]}</TableCell>
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

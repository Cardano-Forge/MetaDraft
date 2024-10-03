"use client";

import React, { useEffect, useState } from "react";

import { ruleSet } from "~/lib/constant";
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
import Loader from "~/components/loader";

export default function Content() {
  const [keys, setKeys] = useState<Rule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

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

  if (loading)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

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
              <Switch checked={ruleSet.includes(key)} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

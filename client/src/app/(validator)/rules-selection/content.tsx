import React from 'react'
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
import { mapping } from '@ada-anvil/metadraft-validator';

export default function Content() {
    
  const keys = Object.keys(mapping) as RulesId[];
  
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
  )
}

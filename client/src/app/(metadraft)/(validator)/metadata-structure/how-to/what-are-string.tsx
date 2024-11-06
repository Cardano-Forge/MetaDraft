import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function WhatAreString() {
  return (
    <AccordionItem value="value-string" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to use string (text) value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">{`Simply enter "default" as the value for any key that you want to be treated as a string.`}</Typography>
          <Typography
            as="code"
            className="text-sm text-white/50"
          >{`A string is represented by double quotes: ""`}</Typography>

          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { name: "default" }`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

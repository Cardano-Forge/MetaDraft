import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function WhatAreNumber() {
  return (
    <AccordionItem value="value-number" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to use number value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">{`Simply enter 0 as the value for any key that you want to be treated as a number.`}</Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { age: 0 }`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

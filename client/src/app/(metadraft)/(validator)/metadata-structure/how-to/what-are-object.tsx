import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function WhatAreObject() {
  return (
    <AccordionItem value="value-object" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to use object value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">
            An object is a way to group related information together using
            key-value pairs. Each key has a specific value assigned to it.
          </Typography>
          <Typography
            as="code"
            className="text-sm text-white/50"
          >{`An object is represented by curly brackets: {}`}</Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { "name": "text", "age": 0, child: { name: "text", age: 0 }, position: [ [ 0, 1 ] ] }`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

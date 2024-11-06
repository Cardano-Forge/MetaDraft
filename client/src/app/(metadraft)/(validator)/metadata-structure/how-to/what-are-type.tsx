import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function WhatAreType() {
  return (
    <AccordionItem value="value-type" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          What are the available type for value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">
            There are four types of values you can use:
          </Typography>
          <Typography as="code">
            <strong>• String –</strong>
            {` A series of characters, like a word or sentence. Example: "Hello World"`}
          </Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: "Hello World"`}</Typography>
          <Typography as="code">
            <strong>• Number –</strong>
            {` Any numerical value.`}
          </Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: 42 or 3.14`}</Typography>
          <Typography as="code">
            <strong>• Object –</strong>
            {` A structured set of key-value pairs, where each key has a specific value. `}
          </Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { "name": "John", "age": 30 } (here, "name" is linked to "John", and "age" is linked to 30)`}</Typography>
          <Typography as="code">
            <strong>• Array –</strong>
            {` A list of values, which can include numbers, strings, or even objects.`}
          </Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: [ "apple", "banana", "cherry" ] (a list of fruit names)`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

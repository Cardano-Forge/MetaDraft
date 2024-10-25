import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ColumnInnerContent from "./column-inner-content";

export default function WhatAreArray() {
  return (
    <AccordionItem value="value-array">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to use array value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">
            When using an array (a list of items), you should place just one
            item in the array to define its type.
          </Typography>
          <Typography
            as="code"
            className="text-sm text-white/50"
          >{`An array is represented by square brackets: []`}</Typography>
          <div className="flex flex-col gap-2 px-4 pt-4">
            <Typography as="code">{`Here’s a breakdown of the different array types and how to set them up:`}</Typography>
            <Typography as="code">
              <strong>string[] – </strong>
              {` A list of words or text.`}
            </Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Example: [ "Hello", "world" ]`}</Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Usage: [ "text" ]`}</Typography>
            <Typography as="code">
              <strong>number[] –</strong>
              {` A list of numbers.`}
            </Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Example: [ 0, 1, 2, 3 ]`}</Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Usage: [ 0 ]`}</Typography>
            <Typography as="code">
              <strong>object[] –</strong>
              {` A list of structured objects (each object contains key-value pairs)`}
            </Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Example: [ { src: "text", mediaType: "text" } ]`}</Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Usage: [ { src: "text", mediaType: "text" } ]`}</Typography>
            <Typography as="code">
              <strong>{`<type>`}[][] –</strong>
              {` A list of arrays of <type> (arrays within arrays)`}
            </Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Example (with number[][]): [ [ 0, 1 ], [ 2, 3 ] ]`}</Typography>
            <Typography
              as="code"
              className="ml-4 text-white/50"
            >{`Usage: [ [ 0 ] ]`}</Typography>
          </div>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

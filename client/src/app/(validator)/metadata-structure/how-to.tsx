import { Typography } from "~/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

// TODO - Accordion : Add information like: all your metadata should have the same schema.

export default function HowToCreateMetadataSchema() {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4">
      <Typography as="h3">FAQ</Typography>
      <Accordion type="single" collapsible>
        <AccordionItem value="value-type" className="border-b border-border/10">
          <AccordionTrigger>
            <Typography as="code" className="text-lg">
              What are the available type for value ?
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ColInnerContent>
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
            </ColInnerContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="value-string"
          className="border-b border-border/10"
        >
          <AccordionTrigger>
            <Typography as="code" className="text-lg">
              How to use string value ?
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ColInnerContent>
              <Typography as="code">{`Simply enter "string" as the value for any key that you want to be treated as a string.`}</Typography>
              <Typography
                as="code"
                className="ml-4 text-white/50"
              >{`Example: { name: "string" }`}</Typography>
            </ColInnerContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="value-number"
          className="border-b border-border/10"
        >
          <AccordionTrigger>
            <Typography as="code" className="text-lg">
              How to use number value ?
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ColInnerContent>
              <Typography as="code">{`Simply enter 0 as the value for any key that you want to be treated as a number.`}</Typography>
              <Typography
                as="code"
                className="ml-4 text-white/50"
              >{`Example: { age: 0 }`}</Typography>
            </ColInnerContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="value-object"
          className="border-b border-border/10"
        >
          <AccordionTrigger>
            <Typography as="code" className="text-lg">
              How to use object value ?
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ColInnerContent>
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
              >{`Example: { "name": "string", "age": 0, child: { name: "string", age: 0 }, position: [ [ 0, 1 ] ] }`}</Typography>
            </ColInnerContent>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="value-array">
          <AccordionTrigger>
            <Typography as="code" className="text-lg">
              How to use array value ?
            </Typography>
          </AccordionTrigger>
          <AccordionContent>
            <ColInnerContent>
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
                >{`Usage: [ "string" ]`}</Typography>
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
                >{`Example: [ { src: "string", mediaType: "string" } ]`}</Typography>
                <Typography
                  as="code"
                  className="ml-4 text-white/50"
                >{`Usage: [ { src: "string", mediaType: "string" } ]`}</Typography>
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
            </ColInnerContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

const ColInnerContent = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col gap-2 rounded-xl bg-card p-4">{children}</div>
);

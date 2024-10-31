import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ColumnInnerContent from "./column-inner-content";

export default function WhatHappenWhenAddOrRemove() {
  return (
    <AccordionItem value="add-or-remove" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          What happens when I add or remove a key ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">{`When you have metadata in your list and decide to add or remove a key-value pair in the schema, saving the updated metadata schema will automatically reflect these changes across all metadata entries in your list. This ensures consistency and saves you time by eliminating the need for manual updates.`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

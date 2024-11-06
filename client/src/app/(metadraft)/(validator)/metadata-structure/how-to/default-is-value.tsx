import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function DefaultIsValue() {
  return (
    <AccordionItem value="default-value" className="border-b border-border/10">
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to add default value ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">{`The text or number you enter as the value for any key will become the default value when you add a new asset to your metadata.`}</Typography>

          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { website: "https://ada-anvil.io/" }`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

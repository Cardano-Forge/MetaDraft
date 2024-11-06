import ColumnInnerContent from "./column-inner-content";
import { Typography } from "~/components/typography";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";

export default function IncrementalName() {
  return (
    <AccordionItem
      value="incremental-name"
      className="border-b border-border/10"
    >
      <AccordionTrigger>
        <Typography as="code" className="text-lg">
          How to have an incremental name ?
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <ColumnInnerContent>
          <Typography as="code">{`Simply add '#' at the end of your asset name. When you add a new asset, the number will automatically increment based on the total number of assets.`}</Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Example: { name: "Anvil #" }`}</Typography>
          <Typography
            as="code"
            className="ml-2"
          >{`Current number of asset is 500`}</Typography>
          <Typography
            as="code"
            className="ml-4 text-white/50"
          >{`Output: { name: "Anvil #501" }`}</Typography>
        </ColumnInnerContent>
      </AccordionContent>
    </AccordionItem>
  );
}

import { Typography } from "~/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import ExclamationIcon from "~/icons/exclamation.icon";
import InformationCircle from "~/icons/information-circle";
import { hyphenToTitleCase } from "~/lib/hyphen-to-title-case";
import type { ValidationsCollection } from "~/lib/types";

export default function ErrorSummaryAccordion({
  assetName,
  validation,
}: {
  assetName: string;
  validation: ValidationsCollection | undefined;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {validation?.validation.errors.map(
        ({ validatorId, validationErrors }) => {
          return (
            <AccordionItem
              value={`${assetName}-${validatorId}`}
              key={`${assetName}-${validatorId}`}
              className="border-b border-border/20 pb-2 pt-1 last:border-none"
            >
              <AccordionTrigger className="px-10">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                    <ExclamationIcon className="text-destructive" />
                  </div>
                  <Typography>{hyphenToTitleCase(validatorId)}</Typography>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mx-10 my-2 flex flex-col gap-2 rounded-xl border border-destructive bg-destructive/10 p-4">
                <Typography>
                  <code>{validationErrors[0]?.message}</code>
                </Typography>
                <div className="rounded-xl border border-border/20 bg-background p-4">
                  <code>{`[`}</code>
                  {validationErrors.map((e) => {
                    return (
                      <Typography key={e.path.join(".")} className="pl-8">
                        <code>{`{ "path": "${e.path.join(".")}" }`}</code>
                      </Typography>
                    );
                  })}
                  <code>{`]`}</code>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        },
      )}

      {validation?.validation.warnings.map(
        ({ validatorId, validationErrors }) => {
          return (
            <AccordionItem
              value={`${assetName}-${validatorId}`}
              key={`${assetName}-${validatorId}`}
              className="border-b border-border/20 pb-2 pt-1 last:border-none"
            >
              <AccordionTrigger className="px-10">
                <div className="flex flex-row items-center gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/10">
                    <InformationCircle className="text-warning" />
                  </div>
                  <Typography>{hyphenToTitleCase(validatorId)}</Typography>
                </div>
              </AccordionTrigger>
              <AccordionContent className="mx-10 my-2 flex flex-col gap-2 rounded-xl border border-warning bg-warning/10 p-4">
                <Typography>
                  <code>{validationErrors[0]?.message}</code>
                </Typography>
                <div className="rounded-xl border border-border/20 bg-background p-4">
                  <code>{`[`}</code>
                  {validationErrors.map((e) => {
                    return (
                      <Typography key={e.path.join(".")} className="pl-8">
                        <code>{`{ "path": "${e.path.join(".")}" }`}</code>
                      </Typography>
                    );
                  })}
                  <code>{`]`}</code>
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        },
      )}
    </Accordion>
  );
}

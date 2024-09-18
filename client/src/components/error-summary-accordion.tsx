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

type StateOutputKeyPath = { key: string; path: string };
type StateOutputValidation = {
  message: string;
  warnings: StateOutputKeyPath[];
  errors: StateOutputKeyPath[];
};

export default function ErrorSummaryAccordion({
  assetName,
  validation,
}: {
  assetName: string;
  validation: ValidationsCollection | undefined;
}) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {validation?.validation.errors.map((error) => {
        console.log(error);
        return (
          <AccordionItem
            value={`${assetName}-${error.validatorId}`}
            key={`${assetName}-${error.validatorId}`}
            className="border-b border-border/20 pb-2 pt-1 last:border-none"
          >
            <AccordionTrigger className="px-10">
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                  <ExclamationIcon className="text-destructive" />
                </div>
                <Typography>{hyphenToTitleCase(error.validatorId)}</Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent className="mx-10 my-2 flex flex-col gap-2 rounded-xl border border-destructive bg-destructive/10 p-4">
              <Typography>
                <code>{(error.message as StateOutputValidation).message}</code>
              </Typography>
              <div className="rounded-xl border border-border/20 bg-background p-4">
                <code>{`[`}</code>
                {error.message &&
                  typeof error.message === "object" &&
                  (error.message as StateOutputValidation).errors?.map(
                    (data) => {
                      return (
                        <Typography
                          key={`${data.key}-${data.path}`}
                          className="pl-8"
                        >
                          <code>{`{ "key": "${data.key}", "path": "${data.path}" }`}</code>
                        </Typography>
                      );
                    },
                  )}

                {error.message && typeof error.message === "string" && (
                  <Typography className="pl-8">
                    <code>{`{ "message": "${error.message}" }`}</code>
                  </Typography>
                )}
                <code>{`]`}</code>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}

      {validation?.validation.warnings.map((warning) => {
        return (
          <AccordionItem
            value={`${assetName}-${warning.validatorId}`}
            key={`${assetName}-${warning.validatorId}`}
            className="border-b border-border/20 pb-2 pt-1 last:border-none"
          >
            <AccordionTrigger className="px-10">
              <div className="flex flex-row items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/10">
                  <InformationCircle className="text-warning" />
                </div>
                <Typography>
                  {hyphenToTitleCase(warning.validatorId)}
                </Typography>
              </div>
            </AccordionTrigger>
            <AccordionContent className="mx-10 my-2 flex flex-col gap-2 rounded-xl border border-warning bg-warning/10 p-4">
              <Typography>
                <code>
                  {(warning.message as StateOutputValidation).message}
                </code>
              </Typography>
              <div className="rounded-xl border border-border/20 bg-background p-4">
                <code>{`[`}</code>
                {warning.message &&
                  typeof warning.message === "object" &&
                  (warning.message as StateOutputValidation).warnings?.map(
                    (data) => (
                      <Typography
                        key={`${data.key}-${data.path}`}
                        className="pl-8"
                      >
                        <code>{`{ "key": "${data.key}", "path": "${data.path}" }`}</code>
                      </Typography>
                    ),
                  )}

                <code>{`]`}</code>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}

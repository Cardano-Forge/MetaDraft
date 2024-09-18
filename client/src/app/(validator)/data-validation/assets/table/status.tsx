import { type StateOutput } from "@ada-anvil/metadraft-validator";
import { useRxData } from "rxdb-hooks";

import { Typography } from "~/components/typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button, type ButtonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import ExclamationIcon from "~/icons/exclamation.icon";
import InformationCircle from "~/icons/information-circle";
import { hyphenToTitleCase } from "~/lib/hyphen-to-title-case";
import type {
  MetadataCollection,
  Status,
  ValidationsCollection,
} from "~/lib/types";
import { cn } from "~/lib/utils";

type StateOutputKeyPath = { key: string; path: string };
type StateOutputValidation = {
  message: string;
  warnings: StateOutputKeyPath[];
  errors: StateOutputKeyPath[];
};

const button: Record<Status, ButtonVariants["variant"]> = {
  success: "success",
  warning: "warning",
  error: "destructive",
  unchecked: "secondary",
};

const variants: Record<Status, string> = {
  success: "bg-success/20 text-success disabled:opacity-100",
  warning: "bg-warning/20 text-warning hover:bg-warning/40",
  error: "bg-destructive/20 text-destructive hover:bg-destructive/40",
  unchecked: "",
};

const text: Record<Status, string> = {
  success: "Valid",
  warning: "Error flag",
  error: "Error detected",
  unchecked: "Unchecked",
};

export default function Status({ metadata }: { metadata: MetadataCollection }) {
  const state = metadata.status;
  const { result, isFetching } = useRxData<ValidationsCollection>(
    "validations",
    (collection) =>
      collection.find().where("assetName").equals(metadata.assetName),
  );

  if (isFetching) return <div>Loading...</div>;

  const validations = result.map(
    (doc) => doc.toJSON() as ValidationsCollection,
  );

  const validation = validations[0];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={state === "success" || state === "unchecked"}
          variant={button[state]}
          className={cn(
            "w-fit items-center justify-center rounded-full !border-none font-semibold tracking-wide !outline-none lg:h-10 lg:px-4 lg:py-2",
            variants[state],
          )}
        >
          {text[state]}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-hidden !rounded-2xl border-none px-0 pb-0 md:max-h-[calc(100vh-4rem)]">
        <DialogHeader className="px-10">
          <DialogTitle className="text-xl font-bold tracking-tight first:mt-0 sm:text-2xl md:text-3xl">
            Errors summary
          </DialogTitle>
          <DialogDescription className="text-border/50">
            {getErrorCountMessage(validation?.validation)}
          </DialogDescription>
        </DialogHeader>
        <Separator className="mt-3 bg-border/20" />

        <Accordion type="single" collapsible className="w-full">
          {validation?.validation.errors.map((error) => {
            console.log(error);
            return (
              <AccordionItem
                value={`${metadata.assetName}-${error.validatorId}`}
                key={`${metadata.assetName}-${error.validatorId}`}
                className="border-b border-border/20 pb-2 pt-1 last:border-none"
              >
                <AccordionTrigger className="px-10">
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                      <ExclamationIcon className="text-destructive" />
                    </div>
                    <Typography>
                      {hyphenToTitleCase(error.validatorId)}
                    </Typography>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="mx-10 my-2 flex flex-col gap-2 rounded-xl border border-destructive bg-destructive/10 p-4">
                  <Typography>
                    <code>
                      {(error.message as StateOutputValidation).message}
                    </code>
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
                value={`${metadata.assetName}-${warning.validatorId}`}
                key={`${metadata.assetName}-${warning.validatorId}`}
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
      </DialogContent>
    </Dialog>
  );
}

const getErrorCountMessage = (validations: StateOutput | undefined) => {
  let message = "";
  if (!validations) return message;
  const errorSize = validations.errors.length;
  const warningSize = validations.warnings.length;

  if (!!errorSize) message += `${errorSize} error${errorSize > 1 ? "s" : ""}`;
  if (!!message.length && !!warningSize) message += ", ";
  if (!!warningSize)
    message += `${warningSize} recommendation${warningSize > 1 ? "s" : ""}`;

  return message;
};

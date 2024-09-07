import { type StateOutput } from "@ada-anvil/metadraft-validator";

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
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import ExclamationIcon from "~/icons/exclamation.icon";
import useAssetState from "~/lib/hooks/use-asset-state";
import { useValidations } from "~/lib/hooks/use-validations";
import { hyphenToTitleCase } from "~/lib/hyphen-to-title-case";
import { type Status } from "~/lib/types";
import { cn } from "~/lib/utils";

type TempValidation = {
  message: string;
  warnings: Temp[];
  errors: Temp[];
};
type Temp = { key: string; path: string };

type StatusProps = {
  assetName: string;
};

const button: Record<Status, ButtonVariants["variant"]> = {
  success: "success",
  warning: "warning",
  error: "destructive",
};

const variants: Record<Status, string> = {
  success: "bg-success/20 text-success disabled:opacity-100",
  warning: "bg-warning/20 text-warning hover:bg-warning/40",
  error: "bg-destructive/20 text-destructive hover:bg-destructive/40",
};

const text: Record<Status, string> = {
  success: "Valid",
  warning: "Error flag",
  error: "Error detected",
};

export default function Status({ assetName }: StatusProps) {
  const { getState } = useAssetState();
  const { getValidations } = useValidations();
  const state = getState(assetName);

  const validations = getValidations(assetName);

  if (!validations) return null;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          disabled={state === "success"}
          variant={button[state]}
          className={cn(
            "w-fit items-center justify-center rounded-full !border-none px-4 py-2 font-semibold tracking-wide !outline-none",
            variants[state],
          )}
        >
          {text[state]}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100vh-2rem)] max-w-3xl overflow-y-hidden !rounded-2xl border-none px-10 md:max-h-[calc(100vh-4rem)]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight first:mt-0 sm:text-2xl md:text-3xl">
            Errors summary
          </DialogTitle>
          <DialogDescription className="text-border/50">
            {getErrorCountMessage(validations)}
          </DialogDescription>
        </DialogHeader>
        <Separator className="bg-border/20" />

        <Accordion type="single" collapsible className="w-full">
          {validations.errors.map((error) => {
            return (
              <AccordionItem
                value={`${assetName}-${error.validatorId}`}
                key={`${assetName}-${error.validatorId}`}
                className="border-border/20 pb-2 pt-1"
              >
                <AccordionTrigger>
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
                      <ExclamationIcon className="text-destructive" />
                    </div>
                    <Typography>
                      {hyphenToTitleCase(error.validatorId)}
                    </Typography>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 rounded-xl border border-destructive bg-destructive/10 p-4">
                  <Typography>
                    <code>{(error.message as TempValidation).message}</code>
                  </Typography>
                  <div className="rounded-xl border border-border/20 bg-background p-4">
                    <code>{`[`}</code>
                    {error.message &&
                      typeof error.message === "object" &&
                      (error.message as TempValidation).errors?.map((data) => (
                        <Typography
                          key={`${data.key}-${data.path}`}
                          className="pl-8"
                        >
                          <code>{`{ "key": "${data.key}", "path": "${data.path}" }`}</code>
                        </Typography>
                      ))}
                    <code>{`]`}</code>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}

          {validations.warnings.map((warning) => {
            return (
              <AccordionItem
                value={`${assetName}-${warning.validatorId}`}
                key={`${assetName}-${warning.validatorId}`}
                className="border-border/20 pb-2 pt-1"
              >
                <AccordionTrigger>
                  <div className="flex flex-row items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/10">
                      <ExclamationIcon className="text-warning" />
                    </div>
                    <Typography>
                      {hyphenToTitleCase(warning.validatorId)}
                    </Typography>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2 rounded-xl border border-warning bg-warning/10 p-4">
                  <Typography>
                    <code>{(warning.message as TempValidation).message}</code>
                  </Typography>
                  <div className="rounded-xl border border-border/20 bg-background p-4">
                    <code>{`[`}</code>
                    {warning.message &&
                      typeof warning.message === "object" &&
                      (warning.message as TempValidation).warnings?.map(
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
        <DialogFooter className="flex flex-row items-center justify-end">
          <DialogClose asChild>
            <Button variant={"ghost"} className="w-fit">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const getErrorCountMessage = (validations: StateOutput) => {
  let message = "";
  const errorSize = validations.errors.length;
  const warningSize = validations.warnings.length;

  if (!!errorSize) message += `${errorSize} error${errorSize > 1 ? "s" : ""}`;
  if (!!message.length) message += ", ";
  if (!!warningSize)
    message += `${warningSize} recommendation${warningSize > 1 ? "s" : ""}`;

  return message;
};

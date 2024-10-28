import { useRxData } from "rxdb-hooks";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Separator } from "~/components/ui/separator";
import type {
  MetadataCollection,
  Status,
  ValidationsCollection,
} from "~/lib/types";
import { Button, type ButtonVariants } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import ErrorSummaryAccordion from "~/components/error-summary-accordion";
import { getErrorCountMessage } from "~/lib/get/get-error-count-message";

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
  const { result, isFetching } = useRxData<ValidationsCollection>(
    "validations",
    (collection) =>
      collection.find().where("assetName").equals(metadata.assetName),
  );

  if (isFetching) return null;

  const validations = result.map(
    (doc) => doc.toJSON() as ValidationsCollection,
  );

  const validation = validations[0];
  const state = metadata.status;

  return (
    <Dialog>
      <DialogTrigger asChild onClick={(event) => event.stopPropagation()}>
        <Button
          title="Open status summary"
          disabled={
            state === "success" ||
            state === "unchecked" ||
            !getErrorCountMessage(validation?.validation).length // Check if there is a warning or an error
          }
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

        <ErrorSummaryAccordion
          assetName={metadata.assetName}
          validation={validation}
        />
      </DialogContent>
    </Dialog>
  );
}

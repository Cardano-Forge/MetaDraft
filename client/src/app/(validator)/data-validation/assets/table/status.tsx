import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button, ButtonVariants } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import useAssetState from "~/lib/hooks/use-asset-state";
import { useValidations } from "~/lib/hooks/use-validations";
import { type Status } from "~/lib/types";
import { cn } from "~/lib/utils";

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
  const {} = useValidations();
  const state = getState(assetName);

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
      <DialogContent className="rounded-xl border-none">
        <DialogHeader>
          <DialogTitle>Errors summary</DialogTitle>
          <DialogDescription className="text-border/40">
            get counts for this asset
          </DialogDescription>
        </DialogHeader>
        <hr />
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles that matches the other
              components&apos; aesthetic.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It&apos;s animated by default, but you can disable it if you
              prefer.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}

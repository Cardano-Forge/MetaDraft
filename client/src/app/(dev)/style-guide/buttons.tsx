import React from "react";
import H from "~/components/h";
import { Button } from "~/components/ui/button";
import CheckCircleIcon from "~/icons/check-circle.icon";
import ExportIcon from "~/icons/export.icon";

export default function Buttons() {
  return (
    <div className="flex flex-col gap-4">
      <H variant="h4">Buttons</H>
      <div className="flex w-full flex-col justify-between gap-4 rounded-xl border p-4">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <H variant="h6">Primary</H>
            <Button variant={"default"} size={"sm"}>
              Small
            </Button>
            <Button variant={"default"} size={"default"}>
              Default
            </Button>
            <Button variant={"default"} size={"lg"}>
              Large
            </Button>
            <Button variant={"default"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"default"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"default"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"default"} size={"default"} loading>
              Primary
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Secondary</H>
            <Button variant={"secondary"} size={"sm"}>
              Small
            </Button>
            <Button variant={"secondary"} size={"default"}>
              Default
            </Button>
            <Button variant={"secondary"} size={"lg"}>
              Large
            </Button>
            <Button variant={"secondary"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"secondary"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"secondary"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"secondary"} size={"default"} loading>
              secondary
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Outline</H>
            <Button variant={"outline"} size={"sm"}>
              Small
            </Button>
            <Button variant={"outline"} size={"default"}>
              Default
            </Button>
            <Button variant={"outline"} size={"lg"}>
              Large
            </Button>
            <Button variant={"outline"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"outline"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"outline"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"outline"} size={"default"} loading>
              outline
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Ghost</H>
            <Button variant={"ghost"} size={"sm"}>
              Small
            </Button>
            <Button variant={"ghost"} size={"default"}>
              Default
            </Button>
            <Button variant={"ghost"} size={"lg"}>
              Large
            </Button>
            <Button variant={"ghost"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"ghost"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"ghost"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"ghost"} size={"default"} loading>
              ghost
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Link</H>
            <Button variant={"link"} size={"sm"}>
              Small
            </Button>
            <Button variant={"link"} size={"default"}>
              Default
            </Button>
            <Button variant={"link"} size={"lg"}>
              Large
            </Button>
            <Button variant={"link"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"link"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"link"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"link"} size={"default"} loading>
              link
            </Button>
          </div>
        </div>

        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <H variant="h6">Success</H>
            <Button variant={"success"} size={"sm"}>
              Small
            </Button>
            <Button variant={"success"} size={"default"}>
              Default
            </Button>
            <Button variant={"success"} size={"lg"}>
              Large
            </Button>
            <Button variant={"success"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"success"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"success"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"success"} size={"default"} loading>
              success
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Success Outine</H>
            <Button variant={"successOutline"} size={"sm"}>
              Small
            </Button>
            <Button variant={"successOutline"} size={"default"}>
              Default
            </Button>
            <Button variant={"successOutline"} size={"lg"}>
              Large
            </Button>
            <Button variant={"successOutline"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"successOutline"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"successOutline"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"successOutline"} size={"default"} loading>
              successOutline
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Warning</H>
            <Button variant={"warning"} size={"sm"}>
              Small
            </Button>
            <Button variant={"warning"} size={"default"}>
              Default
            </Button>
            <Button variant={"warning"} size={"lg"}>
              Large
            </Button>
            <Button variant={"warning"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"warning"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"warning"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"warning"} size={"default"} loading>
              warning
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Warning Outline</H>
            <Button variant={"warningOutilne"} size={"sm"}>
              Small
            </Button>
            <Button variant={"warningOutilne"} size={"default"}>
              Default
            </Button>
            <Button variant={"warningOutilne"} size={"lg"}>
              Large
            </Button>
            <Button variant={"warningOutilne"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"warningOutilne"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"warningOutilne"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"warningOutilne"} size={"default"} loading>
              warningOutilne
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Destructive</H>
            <Button variant={"destructive"} size={"sm"}>
              Small
            </Button>
            <Button variant={"destructive"} size={"default"}>
              Default
            </Button>
            <Button variant={"destructive"} size={"lg"}>
              Large
            </Button>
            <Button variant={"destructive"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"destructive"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"destructive"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"destructive"} size={"default"} loading>
              destructive
            </Button>
          </div>
          <div className="flex flex-col gap-4">
            <H variant="h6">Destructive Outline</H>
            <Button variant={"destructiveOutilne"} size={"sm"}>
              Small
            </Button>
            <Button variant={"destructiveOutilne"} size={"default"}>
              Default
            </Button>
            <Button variant={"destructiveOutilne"} size={"lg"}>
              Large
            </Button>
            <Button variant={"destructiveOutilne"} size={"icon"}>
              <ExportIcon />
            </Button>
            <Button
              variant={"destructiveOutilne"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
            >
              Default
            </Button>
            <Button
              variant={"destructiveOutilne"}
              size={"default"}
              icon={<CheckCircleIcon className="h-5 w-5" />}
              iconPosition="right"
            >
              Default
            </Button>
            <Button variant={"destructiveOutilne"} size={"default"} loading>
              destructiveOutilne
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

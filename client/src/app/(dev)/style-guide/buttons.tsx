"use client";

import React from "react";
import FilterButton from "~/components/filter-button";
import { Typography } from "~/components/typography";

import { Button } from "~/components/ui/button";
import ViewButton from "~/components/view-button";
import CheckCircleIcon from "~/icons/check-circle.icon";
import ExportIcon from "~/icons/export.icon";

export default function Buttons() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Buttons</Typography>
      <div className="flex w-full flex-col justify-between gap-4 rounded-xl border p-4">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <Typography as="h3">Primary</Typography>
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
            <Typography as="h3">Secondary</Typography>
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
            <Typography as="h3">Outline</Typography>
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
            <Typography as="h3">Ghost</Typography>
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
            <Typography as="h3">Link</Typography>
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
            <Typography as="h3">Success</Typography>
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
            <Typography as="h3">Success Outine</Typography>
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
            <Typography as="h3">Warning</Typography>
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
            <Typography as="h3">Warning Outline</Typography>
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
            <Typography as="h3">Destructive</Typography>
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
            <Typography as="h3">Destructive Outline</Typography>
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
        <div className="flex flex-row items-center gap-4 rounded-xl border bg-[#444444] p-4">
          <ViewButton />
          |
          <ViewButton view="grid" />
          |
          <FilterButton />
        </div>
      </div>
    </div>
  );
}

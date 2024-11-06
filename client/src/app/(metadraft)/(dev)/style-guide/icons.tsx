import React from "react";

import { Typography } from "~/components/typography";
import ArrowExpandIcon from "~/icons/arrow-expand.icon";
import ArrowRightIcon from "~/icons/arrow-right.icon";
import BackIcon from "~/icons/back.icon";
import CheckCircleIcon from "~/icons/check-circle.icon";
import CheckIcon from "~/icons/check.icon";
import ChevronDownIcon from "~/icons/chevron-down.icon";
import ChevronUpIcon from "~/icons/chevron-up.icon";
import ClockIcon from "~/icons/clock.icon";
import UploadIcon from "~/icons/cloud-upload.icon";
import CodeIcon from "~/icons/code.icon";
import DatabaseIcon from "~/icons/database.icon";
import DocumentAddIcon from "~/icons/document-add.icon";
import ExclamationIcon from "~/icons/exclamation.icon";
import ExportIcon from "~/icons/export.icon";
import FlagIcon from "~/icons/flag.icon";
import InformationCircle from "~/icons/information-circle";
import KeyIcon from "~/icons/key.icon";
import KeyboardCommandIcon from "~/icons/keyboard-command.icon";
import MinusIcon from "~/icons/minus.icon";
import NextIcon from "~/icons/next.icon";
import NoteIcon from "~/icons/note.icon";
import PencilIcon from "~/icons/pencil.icon";
import PlusIcon from "~/icons/plus.icon";
import RefreshIcon from "~/icons/refresh.icon";
import SearchIcon from "~/icons/search.icon";
import ShuffleIcon from "~/icons/shuffle.icon";
import SliderIcon from "~/icons/slider.icon";
import SortIcon from "~/icons/sort.icon";
import SpaceBarIcon from "~/icons/space-bar.icon";
import SummaryIcon from "~/icons/summary.icon";
import TrashIcon from "~/icons/trash.icon";
import UnorderedListIcon from "~/icons/unordered-list.icon";
import ValuesIcon from "~/icons/values.icon";
import ViewGridIcon from "~/icons/view-grid.icon";
import XCircleIcon from "~/icons/x-circle.icon";
import XIcon from "~/icons/x.icon";

export default function Icons() {
  return (
    <div className="flex flex-col gap-4">
      <Typography as="h2">Icons</Typography>
      <div className="flex w-fit flex-col gap-4 rounded-xl border p-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <UploadIcon />
          <DocumentAddIcon />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <ArrowExpandIcon />
          <ArrowRightIcon />
          <BackIcon />
          <CheckCircleIcon />
          <CheckIcon />
          <ChevronDownIcon />
          <ChevronUpIcon />
          <ClockIcon />
          <CodeIcon />
          <DatabaseIcon />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <ExclamationIcon />
          <ExportIcon />
          <FlagIcon />
          <InformationCircle />
          <KeyIcon />
          <KeyboardCommandIcon />
          <MinusIcon />
          <NextIcon />
          <NoteIcon />
          <PencilIcon />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <PlusIcon />
          <RefreshIcon />
          <SearchIcon />
          <ShuffleIcon />
          <SliderIcon />
          <SortIcon />
          <SpaceBarIcon />
          <SummaryIcon />
          <TrashIcon />
          <UnorderedListIcon />
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <ValuesIcon />
          <ViewGridIcon />
          <XCircleIcon />
          <XIcon />
        </div>
      </div>
    </div>
  );
}

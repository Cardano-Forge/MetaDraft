"use client";

import React from "react";
import { removeRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";


import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import RefreshIcon from "~/icons/refresh.icon";
import { useActiveProject } from "~/providers/active-project.provider";

export default function ClearProjectButton({
  className,
}: {
  className?: string;
}) {
  const activeProject = useActiveProject();

  const handleClick = async () => {
    try {
      await removeRxDatabase("metadraft", getRxStorageDexie());
      location.reload();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  if (!activeProject) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className}>
          <RefreshIcon className="mr-2" /> New Project
          <span className="sr-only">
            Clear all current project information to start fresh.
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently erase all data and any progress made so
            far. Since the data is only stored locally once cleared, it cannot
            be recovered. Please ensure you&apos;re ready to proceed before
            confirming.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center justify-center gap-4">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>
            New project
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

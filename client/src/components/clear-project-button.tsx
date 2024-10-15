"use client";

import React from "react";
import { removeRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { useActiveProject } from "~/providers/active-project.provider";
import RefreshIcon from "~/icons/refresh.icon";

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

export default function ClearProjectButton({
  className,
}: {
  className?: string;
}) {
  const activeProject = useActiveProject();

  const handleClick = async () => {
    try {
      // Clear
      await removeRxDatabase("metadraft", getRxStorageDexie());
      window.localStorage.clear();
      // Reload DB
      location.reload();
    } catch (e) {
      console.error("Failed to remove active project:", e);
    } finally {
    }
  };

  if (!activeProject) return null;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className={className}>
          <RefreshIcon className="mr-2" /> New Project
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

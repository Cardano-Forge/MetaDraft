"use client";

import { removeRxDatabase } from "rxdb";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
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
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

export default function ClearProjectButton({
  className,
}: {
  className?: string;
}) {
  const router = useRouter();
  const activeProject = useActiveProject();

  const handleClick = async () => {
    await activeProject?.remove();
    await removeRxDatabase("metadraft", getRxStorageDexie());
    window.localStorage.clear();
    router.push("/");
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

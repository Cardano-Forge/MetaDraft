import { useRouter } from "next/navigation";
import React, { Dispatch, SetStateAction } from "react";

import HeaderActions from "./actions";
import Status from "~/components/default-status";
import { ImageWithFallback } from "~/components/image-with-fallback";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import BackIcon from "~/icons/back.icon";
import { getImageSrc } from "~/lib/get/get-image-src";
import type { MetadataCollection } from "~/lib/types";

export default function Header({
  metadata,
  isValidating = false,
  hasUnsavedChanges,
  setHasUnsavedChanges,
}: {
  metadata: MetadataCollection;
  isValidating?: boolean;
  hasUnsavedChanges: boolean;
  setHasUnsavedChanges: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (hasUnsavedChanges) {
      e.preventDefault(); // Stop the default navigation behavior
      const confirmLeave = confirm(
        "You have unsaved changes. Are you sure you want to leave this page?",
      );
      if (confirmLeave) {
        setHasUnsavedChanges(false); // Reset unsaved changes
        router.back();
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 pb-8">
      <Button
        variant={"ghost"}
        className="gap-4 !px-4 text-white/50"
        onClick={handleClick}
      >
        <BackIcon className="h-4 w-4 text-white" /> Back to the list
      </Button>
      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-row gap-8">
          <ImageWithFallback
            src={getImageSrc(metadata.metadata.image)}
            className="max-h-36 max-w-36"
          />
          <div className="flex flex-col gap-4">
            <Status state={metadata.status} />
            <Typography as="h1">{metadata.assetName}</Typography>
          </div>
        </div>
        <HeaderActions metadata={metadata} isValidating={isValidating} />
      </div>
    </div>
  );
}

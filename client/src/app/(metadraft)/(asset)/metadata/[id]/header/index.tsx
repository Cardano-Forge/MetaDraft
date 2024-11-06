import { useRouter } from "next/navigation";
import React from "react";

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
}: {
  metadata: MetadataCollection;
  isValidating?: boolean;
}) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 pb-8">
      <Button
        variant={"ghost"}
        className="gap-4 !px-4 text-white/50"
        onClick={() => router.back()}
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

import React from "react";
import Image from "next/image";

import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import BackIcon from "~/icons/back.icon";
import type { MetadataCollection } from "~/lib/types";
import { getImageSrc } from "~/lib/get/get-image-src";
import Status from "~/components/default-status";
import HeaderActions from "./actions";
import { useRouter } from "next/navigation";

export default function Header({ metadata }: { metadata: MetadataCollection }) {
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
          <Image
            alt="metadata"
            width={100}
            height={100}
            src={getImageSrc(metadata.metadata.image)}
            className="rounded-xl"
          />
          <div className="flex flex-col gap-4">
            <Status state={metadata.status} />
            <Typography as="h1">{metadata.assetName}</Typography>
          </div>
        </div>
        <HeaderActions metadata={metadata} />
      </div>
    </div>
  );
}

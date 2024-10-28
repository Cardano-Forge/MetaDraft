import CodeIcon from "~/icons/code.icon";

import { getImageSrc } from "~/lib/get/get-image-src";
import { getCID } from "~/lib/get/get-cid";
import { cn } from "~/lib/utils";
import type { MetadataCollection } from "~/lib/types";

import { Button } from "~/components/ui/button";
import { Typography } from "~/components/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

import { ImageWithFallback } from "~/components/image-with-fallback";
import Status from "../status";
import Actions from "../actions";
import { useRouter } from "next/navigation";

export default function Card({ metadata }: { metadata: MetadataCollection }) {
  const router = useRouter();
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-white/20 bg-card hover:border-white",
      )}
    >
      <ImageWithFallback
        src={getImageSrc(metadata.metadata.image)}
        className={"cursor-pointer"}
        onClick={() => router.push(`/metadata/${metadata.id}`)}
      />
      <div className="flex flex-col gap-4 p-4">
        <Status metadata={metadata} />

        <Typography
          as="largeText"
          className="cursor-pointer"
          onClick={() => router.push(`/metadata/${metadata.id}`)}
        >
          {metadata.assetName}
        </Typography>
        <div className="flex flex-row items-end justify-between">
          <Popover>
            <PopoverTrigger asChild>
              <Button size={"icon"} variant="outline">
                <CodeIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-fit max-w-[100vw]">
              <div className="flex flex-col gap-2 rounded-lg p-2">
                <Typography as="smallText">
                  <code>NAME : {metadata.metadata.name},</code>
                </Typography>
                <Typography
                  as="smallText"
                  className="text-ellipsis text-nowrap"
                >
                  <code>CID : {getCID(metadata.metadata.image)}</code>
                </Typography>
              </div>
            </PopoverContent>
          </Popover>
          <Actions metadata={metadata} card />
        </div>
      </div>
    </div>
  );
}

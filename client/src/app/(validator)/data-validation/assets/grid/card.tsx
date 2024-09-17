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

import { AssetCardThumbnail } from "./asset-card";
import Status from "../table/status";
import Actions from "../actions";

export default function Card({ meta }: { meta: MetadataCollection }) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-white/20 bg-card",
      )}
    >
      <AssetCardThumbnail src={getImageSrc(meta.metadata.image)} />
      <div className="flex flex-col gap-4 p-4">
        <Status metadata={meta} />
        <Typography as="largeText">{meta.assetName}</Typography>
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
                  <code>NAME : {meta.metadata.name},</code>
                </Typography>
                <Typography
                  as="smallText"
                  className="text-ellipsis text-nowrap"
                >
                  <code>CID : {getCID(meta.metadata.image)}</code>
                </Typography>
              </div>
            </PopoverContent>
          </Popover>
          <Actions metadata={meta} />
        </div>
      </div>
    </div>
  );
}

import { getImageSrc } from "~/lib/get-image-src";
import { getCID } from "~/lib/get-cid";
import { cn } from "~/lib/utils";
import type { MetatdataJSON } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/typography";
import CodeIcon from "~/icons/code.icon";

import Status from "../table/status";
import { AssetCardThumbnail } from "./asset-card";
import Actions from "./actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";

type CardProps = {
  asset: MetatdataJSON[number];
};

export default function Card({ asset }: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-white/20 bg-card",
      )}
    >
      <AssetCardThumbnail src={getImageSrc(asset.metadata.image)} />
      <div className="flex flex-col gap-4 p-4">
        <Status assetName={asset.assetName} />
        <Typography as="largeText">{asset.assetName}</Typography>
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
                  <code>NAME : {asset.metadata.name},</code>
                </Typography>
                <Typography as="smallText" className="text-nowrap text-ellipsis">
                  <code>CID : {getCID(asset.metadata.image)}</code>
                </Typography>
              </div>
            </PopoverContent>
          </Popover>
          <Actions assetName={asset.assetName} />
        </div>
      </div>
    </div>
  );
}

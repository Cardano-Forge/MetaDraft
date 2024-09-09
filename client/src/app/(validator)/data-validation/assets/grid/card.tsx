import { getImageSrc } from "~/lib/get-image-src";
import { getCID } from "~/lib/get-cid";
import { cn } from "~/lib/utils";
import type { MetatdataJSON } from "~/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import { Typography } from "~/components/typography";
import CodeIcon from "~/icons/code.icon";

import Status from "../table/status";
import { AssetCardThumbnail } from "./asset-card";
import Actions from "./actions";

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
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant="outline">
                <CodeIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-2 rounded-lg p-2">
                <Typography as="smallText">
                  <code>NAME : {asset.metadata.name},</code>
                </Typography>
                <Typography as="smallText">
                  <code>CID : {getCID(asset.metadata.image)}</code>
                </Typography>
              </div>
            </TooltipContent>
          </Tooltip>
          <Actions assetName={asset.assetName} />
        </div>
      </div>
    </div>
  );
}

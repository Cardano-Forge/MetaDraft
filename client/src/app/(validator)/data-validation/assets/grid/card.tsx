import Image from "next/image";
import React from "react";
import { getImageSrc } from "~/lib/get-image-src";
import Status from "../table/status";
import { Typography } from "~/components/typography";
import Actions from "./actions";
import { cn } from "~/lib/utils";
import type { MetatdataJSON } from "~/lib/types";
import { AssetCardThumbnail } from "./asset-card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { Button } from "~/components/ui/button";
import ArrowExpandIcon from "~/icons/arrow-expand.icon";
import CodeIcon from "~/icons/code.icon";

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
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size={"icon"} variant="outline">
                <CodeIcon />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <div className="flex flex-col gap-2 rounded-lg p-2">
                <Typography as="smallText">
                  NAME {asset.metadata.name}
                </Typography>
                <Typography as="smallText">
                  CID {(asset.metadata.image as string).replace("ipfs://", "")}
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

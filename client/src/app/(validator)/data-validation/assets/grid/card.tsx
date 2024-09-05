import Image from "next/image";
import React from "react";
import { getImageSrc } from "~/lib/get-image-src";
import Status from "../table/status";
import { Typography } from "~/components/typography";
import Actions from "./actions";
import { Checkbox } from "~/components/ui/checkbox";
import { useSelectedAssets } from "~/lib/hooks/use-selected-assets";
import { cn } from "~/lib/utils";
import type { MetatdataJSON } from "~/lib/types";
import useAssetState from "~/lib/hooks/use-asset-state";
import Loader from "~/components/loader";

type CardProps = {
  asset: MetatdataJSON[number];
};

export default function Card({ asset }: CardProps) {
  const { handleAddOrRemove, isSelected } = useSelectedAssets();
  const { isFetching, getState } = useAssetState();

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border border-white/20 bg-card",
        isSelected(asset) && "border-white/60 bg-muted",
      )}
    >
      <Image
        width={248}
        height={248}
        alt="nft"
        src={getImageSrc(asset.metadata.image)}
        className="rounded-xl"
      />
      {/* <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/30">
        <Checkbox
          disabled
          checked={isSelected(asset)}
          onCheckedChange={() => handleAddOrRemove(asset)}
        />
      </div> */}
      <div className="flex flex-col gap-4 p-4">
        <Status state={getState(asset.assetName)} />
        <Typography as="largeText">{asset.assetName}</Typography>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col gap-2">
            <Typography as="smallText">ID {asset.assetName}</Typography>
            <Typography as="smallText" className="max-w-24 truncate">
              CID {(asset.metadata.image as string).replace("ipfs://", "")}
            </Typography>
          </div>
          <Actions
            state={getState(asset.assetName)}
            assetName={asset.assetName}
          />
        </div>
      </div>
    </div>
  );
}

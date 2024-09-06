import Image from "next/image";
import React from "react";
import { getImageSrc } from "~/lib/get-image-src";
import Status from "../table/status";
import { Typography } from "~/components/typography";
import Actions from "./actions";
import { cn } from "~/lib/utils";
import type { MetatdataJSON } from "~/lib/types";

type CardProps = {
  asset: MetatdataJSON[number];
};

export default function Card({ asset }: CardProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-xl border border-white/20 bg-card",
      )}
    >
      <Image
        width={248}
        height={248}
        alt="nft"
        src={getImageSrc(asset.metadata.image)}
        className="rounded-xl"
      />

      <div className="flex flex-col gap-4 p-4">
        <Status assetName={asset.assetName} />
        <Typography as="largeText">{asset.assetName}</Typography>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col gap-2">
            <Typography as="smallText">ID {asset.assetName}</Typography>
            <Typography as="smallText" className="max-w-24 truncate">
              CID {(asset.metadata.image as string).replace("ipfs://", "")}
            </Typography>
          </div>
          <Actions assetName={asset.assetName} />
        </div>
      </div>
    </div>
  );
}

import Image from "next/image";
import React from "react";
import { formatIPFS } from "~/lib/format-ipfs-url";
import Status from "../table/status";
import { Typography } from "~/components/typography";
import Actions from "./actions";
import { Checkbox } from "~/components/ui/checkbox";
import { useSelectedAssets } from "~/lib/hooks/use-selected-assets";
import { cn } from "~/lib/utils";
import { MetatdataJSON, ValidatorResult, ValidatorResults } from "~/lib/types";

type CardProps = {
  asset: MetatdataJSON[number];
  validations: ValidatorResults;
};

export default function Card({ asset, validations }: CardProps) {
  const { handleAddOrRemove, isSelected } = useSelectedAssets();

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-xl border border-white/20 bg-card",
        isSelected(asset) && "border-white/60 bg-muted",
      )}
    >
      <Image
        width={248}
        height={248}
        alt=""
        src={formatIPFS(asset.metadata.image as string)}
        className="rounded-xl"
      />
      <div className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/30">
        <Checkbox
          checked={isSelected(asset)}
          onCheckedChange={() => handleAddOrRemove(asset)}
        />
      </div>
      <div className="flex flex-col gap-4 p-4">
        <Status
          state={
            validations[asset.assetName]
              ? (validations[asset.assetName]?.status ?? "success")
              : "success"
          }
        />
        <Typography as="largeText">{asset.assetName}</Typography>
        <div className="flex flex-row items-end justify-between">
          <div className="flex flex-col gap-2">
            <Typography as="smallText">ID {asset.assetName}</Typography>
            <Typography as="smallText" className="max-w-24 truncate">
              CID {(asset.metadata.image as string).replace("ipfs://", "")}
            </Typography>
          </div>
          <Actions
            state={
              validations[asset.assetName]
                ? (validations[asset.assetName]?.status ?? "success")
                : "success"
            }
          />
        </div>
      </div>
    </div>
  );
}

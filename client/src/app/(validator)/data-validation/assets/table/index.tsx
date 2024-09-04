import React, { useEffect, useState } from "react";
import Image from "next/image";
import { type CheckedState } from "@radix-ui/react-checkbox";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";

import { type Metadata } from "~/lib/db/types";
import { formatIPFS } from "~/lib/format-ipfs-url";
import { useSelectedAssets } from "~/lib/hooks/use-selected-assets";

import Status from "./status";
import Actions from "./actions";
import Footer from "../footer";
import { cn } from "~/lib/utils";
import useAssetState from "~/lib/hooks/use-asset-state";
import Loader from "~/components/loader";

type TableViewProps = {
  metadata: Metadata["data"][];
  page: number;
};

// TODO - HOOK TO GET ASSET STATE

export default function TableView({ metadata, page }: TableViewProps) {
  const { assets, selectAll, handleAddOrRemove, clear, isSelected } =
    useSelectedAssets();
  const [allSelected, setAllSelected] = useState<CheckedState>(
    assets.length == metadata[page - 1]?.length,
  );
  const { isFetching, getState } = useAssetState();

  useEffect(() => {
    setAllSelected(assets.length == metadata[page - 1]?.length);
  }, [assets]);

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      selectAll(metadata[page - 1] ?? []);
    } else {
      clear();
    }
    setAllSelected(checked);
  };

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <>
      <Table>
        <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
          <TableRow>
            <TableHead className="w-12">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-24 text-white/70">NFT</TableHead>
            <TableHead className="text-white/70">NAME</TableHead>
            <TableHead className="text-white/70">CID</TableHead>
            <TableHead className="w-44 text-white/70">STATUS</TableHead>
            <TableHead className="w-52 text-white/70">QUICK ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
          {metadata[page - 1]?.map((meta) => {
            return (
              <TableRow
                key={meta.assetName}
                className={cn(isSelected(meta) && "bg-muted")}
              >
                <TableHead>
                  <Checkbox
                    checked={isSelected(meta)}
                    onCheckedChange={() => handleAddOrRemove(meta)}
                  />
                </TableHead>
                <TableCell>
                  {/* TODO - formater for all possible image, not only IPFS */}
                  <Image
                    width={64}
                    height={64}
                    alt=""
                    src={formatIPFS(meta.metadata.image as string)}
                    className="rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-bold">{meta.assetName}</TableCell>
                <TableCell className="text-ellipsis">
                  {Array.isArray(meta.metadata.image)
                    ? meta.metadata.image.join("")
                    : meta.metadata.image}
                </TableCell>
                <TableCell>
                  <Status state={getState(meta.assetName)} />
                </TableCell>
                <TableCell>
                  <Actions state={getState(meta.assetName)} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Footer page={page} lastPage={metadata.length} />
    </>
  );
}

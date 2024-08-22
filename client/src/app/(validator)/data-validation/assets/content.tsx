import React from "react";
import useLocalStorage from "~/lib/hooks/use-local-storage";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Input } from "~/components/ui/input";
import { Checkbox } from "~/components/ui/checkbox";
import { chunk } from "~/lib/chunk";
import { Metadata } from "~/lib/db/types";

type ContentProps = {
  metadata: Metadata["data"];
};

export default function Content({ metadata }: ContentProps) {
  const [assetView] = useLocalStorage("asset_view", "table");

  const chunked = chunk(metadata, 10);

  if (assetView === "table")
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">
              <Checkbox />
            </TableHead>
            <TableHead className="w-24">NFT</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>CID</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>QUICK ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {metadata.slice(0, 10).map((meta, i) => {
            return (
              <TableRow key={meta.name as string}>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableCell>
                  <Image
                    width={64}
                    height={64}
                    alt=""
                    src={(meta.image as string).replace(
                      "ipfs://",
                      "https://ipfs.io/ipfs/",
                    )}
                    className="rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-bold">
                  {meta.name as string}
                </TableCell>
                <TableCell>{meta.image as string}</TableCell>
                <TableCell>status</TableCell>
                <TableCell>actions</TableCell>
              </TableRow>
            );
            // }
          })}
        </TableBody>
      </Table>
    );
  return <div>GRID</div>;
}

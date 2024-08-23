import React, { useState } from "react";
import useLocalStorage from "~/lib/hooks/use-local-storage";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Checkbox } from "~/components/ui/checkbox";
import { chunk } from "~/lib/chunk";
import { type Metadata } from "~/lib/db/types";
import Footer from "./footer";
import { useSearchParams } from "next/navigation";

type ContentProps = {
  metadata: Metadata["data"];
};

export default function Content({ metadata }: ContentProps) {
  const searchParams = useSearchParams();
  const param = searchParams.get("page");
  const [page, setPage] = useState<number>(param ? +param : 1);
  const [assetView] = useLocalStorage("asset_view", "table"); // maybe set it in url

  const chunked = chunk(metadata, 10);

  if (assetView === "table")
    return (
      <>
        <Table>
          <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
            <TableRow>
              <TableHead className="w-12">
                <Checkbox />
              </TableHead>
              <TableHead className="w-24 text-white/70">NFT</TableHead>
              <TableHead className="text-white/70">ID</TableHead>
              <TableHead className="text-white/70">CID</TableHead>
              <TableHead className="text-white/70">STATUS</TableHead>
              <TableHead className="text-white/70">QUICK ACTIONS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
            {chunked[page - 1]?.map((meta) => {
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
            })}
          </TableBody>
        </Table>
        <Footer page={page} lastPage={chunked.length} setPage={setPage} />
      </>
    );
  return <div>GRID</div>;
}

import React from "react";
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
import { type Metadata } from "~/lib/db/types";
import Footer from "../footer";
import { formatIPFS } from "~/lib/format-ipfs-url";
import Status from "./status";
import Actions from "./actions";

type TableViewProps = {
  metadata: Metadata["data"][];
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
};

export default function TableView({ metadata, page, setPage }: TableViewProps) {
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
            <TableHead className="w-44 text-white/70">STATUS</TableHead>
            <TableHead className="w-52 text-white/70">QUICK ACTIONS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
          {metadata[page - 1]?.map((meta) => {
            return (
              <TableRow key={meta.name as string}>
                <TableHead>
                  <Checkbox />
                </TableHead>
                <TableCell>
                  {/* TODO - formater for all possible image, not only IPFS */}
                  <Image
                    width={64}
                    height={64}
                    alt=""
                    src={formatIPFS(meta.image as string)}
                    className="rounded-xl"
                  />
                </TableCell>
                <TableCell className="font-bold">
                  {meta.name as string}
                </TableCell>
                <TableCell>
                  {/* TODO - formater for all possible image */}
                  {(meta.image as string).replace("ipfs://", "")}
                </TableCell>
                <TableCell>
                  <Status state="success" />
                </TableCell>
                <TableCell>
                  <Actions state="success" />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Footer page={page} lastPage={metadata.length} setPage={setPage} />
    </>
  );
}

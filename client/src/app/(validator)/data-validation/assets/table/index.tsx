import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Status from "./status";
import Actions from "./actions";
import type { MetatdataJSON } from "~/lib/types";
import { getImageSrc } from "~/lib/get-image-src";
import { getCID } from "~/lib/get-cid";
import { useSearchParams } from "next/navigation";
import { getPageFromParams } from "~/lib/get-page-from-param";

type TableViewProps = {
  metadata: MetatdataJSON[];
};

export default function TableView({ metadata }: TableViewProps) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadata.length);

  return (
    <Table>
      <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
        <TableRow>
          <TableHead className="w-24 text-white/70">NFT</TableHead>
          <TableHead className="text-white/70">ID</TableHead>
          <TableHead className="text-white/70">NAME</TableHead>
          <TableHead className="text-white/70">CID</TableHead>
          <TableHead className="w-44 text-white/70">STATUS</TableHead>
          <TableHead className="w-52 text-white/70">QUICK ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
        {metadata[page - 1]?.map((meta) => {
          return (
            <TableRow key={meta.assetName}>
              <TableCell>
                <Image
                  width={64}
                  height={64}
                  alt="nft"
                  src={getImageSrc(meta.metadata.image)}
                  className="rounded-xl"
                />
              </TableCell>
              <TableCell className="font-bold">{meta.assetName}</TableCell>
              <TableCell>{meta.metadata.name}</TableCell>
              <TableCell className="text-ellipsis">
                {getCID(meta.metadata.image)}
              </TableCell>
              <TableCell>
                <Status assetName={meta.assetName} />
              </TableCell>
              <TableCell>
                <Actions assetName={meta.assetName} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

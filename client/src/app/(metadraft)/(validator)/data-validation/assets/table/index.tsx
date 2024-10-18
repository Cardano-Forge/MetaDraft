import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

import Status from "./status";
import Actions from "../actions";
import type { MetadataCollection } from "~/lib/types";
import { getImageSrc } from "~/lib/get/get-image-src";
import { getCID } from "~/lib/get/get-cid";
import { useSearchParams } from "next/navigation";
import { getPageFromParams } from "~/lib/get/get-page-from-param";
import { ImageWithFallback } from "~/components/image-with-fallback";

export default function TableView({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadatas.length);

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
        {metadatas[page - 1]?.map((meta) => {
          return (
            <TableRow key={meta.id}>
              <TableCell>
                <div className="relative h-16 w-16">
                  <ImageWithFallback
                    src={getImageSrc(meta.metadata.image)}
                    className="rounded-xl"
                  />
                </div>
              </TableCell>
              <TableCell className="font-bold">{meta.assetName}</TableCell>
              <TableCell>{meta.metadata.name}</TableCell>
              <TableCell className="text-ellipsis">
                {getCID(meta.metadata.image)}
              </TableCell>
              <TableCell>
                <Status metadata={meta} />
              </TableCell>
              <TableCell>
                <Actions metadata={meta} />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

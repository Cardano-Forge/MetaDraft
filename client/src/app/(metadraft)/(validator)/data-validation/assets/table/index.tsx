import { useRouter, useSearchParams } from "next/navigation";

import Actions from "../actions";
import Status from "../status";
import { ImageWithFallback } from "~/components/image-with-fallback";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { getCID } from "~/lib/get/get-cid";
import { getImageSrc } from "~/lib/get/get-image-src";
import { getPageFromParams } from "~/lib/get/get-page-from-param";
import type { MetadataCollection } from "~/lib/types";
import { Typography } from "~/components/typography";

export default function TableView({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadatas.length);

  return (
    <Table>
      <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
        <TableRow>
          <TableHead className="w-24 text-white/70">NFT</TableHead>
          <TableHead className="min-w-36 text-white/70">ID</TableHead>
          <TableHead className="min-w-36 text-white/70">NAME</TableHead>
          <TableHead className="text-white/70">CID</TableHead>
          <TableHead className="w-44 text-white/70">STATUS</TableHead>
          <TableHead className="w-52 text-white/70">QUICK ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
        {metadatas?.length === 0 && (
          <TableRow>
            <TableCell colSpan={6}>
              <Typography as="code">No results found</Typography>
            </TableCell>
          </TableRow>
        )}
        {metadatas[page - 1]?.map((meta) => {
          return (
            <TableRow key={meta.id}>
              <TableCell
                title="Go to asset page"
                aria-label="Go to asset page"
                onClick={() => router.push(`/metadata/${meta.id}`)}
                className="cursor-pointer"
              >
                <div className="relative h-16 w-16">
                  <ImageWithFallback
                    src={getImageSrc(meta.metadata.image)}
                    className="rounded-xl"
                  />
                </div>
              </TableCell>
              <TableCell
                title="Go to asset page"
                aria-label="Go to asset page"
                className="cursor-pointer font-bold"
                onClick={() => router.push(`/metadata/${meta.id}`)}
              >
                {meta.assetName}
              </TableCell>
              <TableCell
                title="Go to asset page"
                aria-label="Go to asset page"
                onClick={() => router.push(`/metadata/${meta.id}`)}
                className="cursor-pointer"
              >
                {meta.metadata.name}
              </TableCell>
              <TableCell
                title="Go to asset page"
                aria-label="Go to asset page"
                className="cursor-pointer text-ellipsis"
                onClick={() => router.push(`/metadata/${meta.id}`)}
              >
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

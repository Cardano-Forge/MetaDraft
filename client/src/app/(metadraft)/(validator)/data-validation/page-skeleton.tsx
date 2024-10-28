import { useSearchParams } from "next/navigation";
import React from "react";
import { Typography } from "~/components/typography";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { ImageWithFallback } from "~/components/image-with-fallback";
import { getViewFromParams } from "~/lib/get/get-view-from-param";

export default function PageSkeleton() {
  const searchParams = useSearchParams();
  const view = getViewFromParams(searchParams.get("view"));

  const table = (
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
        {Array(10)
          .fill(0)
          .map((_) => (
            <TableRow key={`${_}`}>
              <TableCell>
                <Skeleton className="h-16 w-16 rounded-xl" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-xl" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-20 rounded-xl" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-96 rounded-xl" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-10 w-40 rounded-full" />
              </TableCell>
              <TableCell className="flex flex-row gap-2 pt-7">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
  const grid = (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {Array(10)
        .fill(0)
        .map((_) => (
          <div
            key={`${_}`}
            className={
              "relative flex flex-col rounded-xl border border-white/20 bg-card"
            }
          >
            <ImageWithFallback src="" />
            <div className="flex flex-col gap-4 p-4">
              <Skeleton className="h-10 w-32 rounded-full" />
              <Skeleton className="h-8 w-40 rounded-full" />
              <div className="flex flex-row items-end justify-between">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex flex-row gap-2">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-10 w-10 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">NFTs data validation</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Skeleton className="flex h-11 w-44 items-center justify-center rounded-xl">
            Validating...
          </Skeleton>
          <Skeleton className="h-11 w-44 rounded-xl" />
        </div>
      </div>
      <div className="flex flex-col rounded-2xl bg-card">
        <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
          <div className="flex flex-row items-center gap-2 p-2">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-12 w-24 rounded-xl" />
          </div>
          <Skeleton className="h-12 w-80 rounded-xl" />
        </div>
        {view === "table" ? table : grid}
        <div className="flex flex-row items-center justify-between p-4">
          <div className="flex flex-row items-center gap-2">
            <Skeleton className="h-12 w-32 rounded-xl" />
            <Skeleton className="h-12 w-24 rounded-xl" />
          </div>
          <Skeleton className="h-12 w-44 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

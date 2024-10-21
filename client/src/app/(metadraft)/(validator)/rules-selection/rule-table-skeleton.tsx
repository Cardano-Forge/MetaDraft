import React from "react";
import { Skeleton } from "~/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

export default function RuleTableSkeleton() {
  return (
    <Table>
      <TableHeader className="h-14 bg-secondary text-white/50 hover:bg-secondary [&>*]:border-white/30">
        <TableRow>
          <TableHead className="w-40">Rule Name</TableHead>
          <TableHead>Definition</TableHead>
          <TableHead className="w-20">Active</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="[&_tr:last-child]:border-1 [&>*]:border-white/30">
        {Array(10)
          .fill(0)
          .map((_) => (
            <TableRow key={`${_}`}>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-36 rounded-md" />
              </TableCell>
              <TableCell className="flex flex-col gap-2">
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-full rounded-lg" />
                <Skeleton className="h-4 w-[66%] rounded-lg" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-12 rounded-xl" />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}

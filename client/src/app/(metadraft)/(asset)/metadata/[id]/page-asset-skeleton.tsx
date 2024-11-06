import React from "react";

import Header from "./header";
import { Skeleton } from "~/components/ui/skeleton";
import { type MetadataCollection } from "~/lib/types";

export default function PageAssetSkeleton({
  metadata,
  isValidating = false,
}: {
  metadata: MetadataCollection;
  isValidating?: boolean;
}) {
  return (
    <div className="pt-5">
      <div className="container">
        <Header metadata={metadata} isValidating={isValidating} />
      </div>
      <main className="border-t border-white/15 py-8">
        <div className="container">
          <div className="flex flex-row gap-4">
            <div className="flex w-full flex-col gap-4 rounded-xl border border-white/10 bg-card p-4 px-8 shadow-lg">
              <Skeleton className="h-11 w-32 rounded-xl" />
              <div className="flex h-[33vh] flex-col gap-4 rounded-xl bg-background p-4 pt-6">
                <Skeleton className="h-4 w-[94%] rounded-full" />
                <Skeleton className="h-4 w-[90%] rounded-full" />
                <Skeleton className="h-4 w-[96%] rounded-full" />
                <Skeleton className="h-4 w-[88%] rounded-full" />
                <Skeleton className="h-4 w-[90%] rounded-full" />
                <Skeleton className="h-4 w-[92%] rounded-full" />
                <Skeleton className="h-4 w-[90%] rounded-full" />
                <Skeleton className="h-4 w-[76%] rounded-full" />
              </div>
            </div>

            <div className="flex min-w-[60%] flex-col gap-6 rounded-xl bg-card p-4 px-8">
              <div className="flex flex-row items-center justify-between">
                <Skeleton className="flex h-11 w-32 items-center justify-center rounded-xl" />
                <Skeleton className="flex h-11 w-44 items-center justify-center rounded-xl">
                  Validating...
                </Skeleton>
              </div>
              <Skeleton className="h-4 w-[60%] rounded-full px-2" />
              <Skeleton className="h-4 w-[66%] rounded-full px-2" />

              <div className="flex h-[50vh] min-w-full flex-col gap-4 rounded-xl bg-background p-4">
                <Skeleton className="h-4 w-[18%] rounded-full" />
                <Skeleton className="ml-8 h-4 w-[44%] rounded-full" />
                <Skeleton className="ml-8 h-4 w-[33%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[20%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[80%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[20%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[24%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[44%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-[26%] rounded-full" />
                <Skeleton className="ml-24 h-4 w-[24%] rounded-full" />
                <Skeleton className="ml-24 h-4 w-[20%] rounded-full" />
                <Skeleton className="ml-24 h-4 w-[28%] rounded-full" />
                <Skeleton className="ml-24 h-4 w-[22%] rounded-full" />
                <Skeleton className="ml-24 h-4 w-[26%] rounded-full" />
                <Skeleton className="ml-16 h-4 w-4 rounded-full" />
                <Skeleton className="ml-8 h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

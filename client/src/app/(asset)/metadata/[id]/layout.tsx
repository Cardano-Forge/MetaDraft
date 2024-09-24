"use client";

import { useRxData } from "rxdb-hooks";
import Header from "./header";
import type { MetadataCollection } from "~/lib/types";

export default function Layout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { id: string } }>) {
  const { result, isFetching } = useRxData<MetadataCollection>(
    "metadata",
    (collection) => collection.findByIds([params.id]),
  );

  if (isFetching) {
  }

  const metadata: MetadataCollection | undefined = result.map(
    (doc) => doc.toJSON() as MetadataCollection,
  )[0];

  if (!metadata) return <div>No metdata found</div>;

  return (
    <div className="pt-5">
      <div className="container">
        <Header metadata={metadata} />
      </div>
      <main className="border-t border-white/15 py-8">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

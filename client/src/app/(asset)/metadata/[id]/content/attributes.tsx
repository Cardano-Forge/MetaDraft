import React from "react";
import { Typography } from "~/components/typography";
import type { MetadataCollection } from "~/lib/types";

export default function Attributes({
  metadata,
}: {
  metadata: MetadataCollection;
}) {
  return (
    <div className="flex w-full min-w-[50%] flex-col gap-4 rounded-xl border border-white/10 bg-secondary p-4 px-8 shadow-lg">
      <Typography as="h2">Attributes</Typography>
    </div>
  );
}

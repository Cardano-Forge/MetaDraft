import React, { useEffect, useState } from "react";
import { type CheckedState } from "@radix-ui/react-checkbox";

import { Typography } from "~/components/typography";
import { Checkbox } from "~/components/ui/checkbox";

import { useSelectedAssets } from "~/lib/hooks/use-selected-assets";
import { useSearchParams } from "next/navigation";
import type { MetatdataJSON } from "~/lib/types";

export default function SelectAll({ metadata }: { metadata: MetatdataJSON[] }) {
  const searchParams = useSearchParams();
  const param = searchParams.get("page");
  const page = param ? +param - 1 : 0;
  const { assets, selectAll, clear } = useSelectedAssets();

  const [allSelected, setAllSelected] = useState<CheckedState>(
    assets.length == metadata[page]?.length,
  );

  useEffect(() => {
    setAllSelected(assets.length == metadata[page]?.length);
  }, [assets]);

  const handleSelectAll = (checked: CheckedState) => {
    if (checked) {
      selectAll(metadata[page] ?? []);
    } else {
      clear();
    }
    setAllSelected(checked);
  };

  return (
    <div className="mx-2 flex items-center space-x-2">
      <Checkbox
        disabled
        id="selectAll"
        checked={allSelected}
        onCheckedChange={handleSelectAll}
      />
      <Typography as="smallText" className="font-normal text-white/50">
        Select all on this page
      </Typography>
    </div>
  );
}

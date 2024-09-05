import { type Metadata } from "~/lib/db/types";

import Card from "./card";

type GridViewProps = {
  metadata: Metadata["data"][];
  page: number;
};

export default function GridView({ metadata, page }: GridViewProps) {
  return (
    <div className="grid grid-flow-row grid-cols-4 xl:grid-cols-5 gap-4 px-4">
      {metadata[page - 1]?.map((meta) => (
        <Card key={meta.assetName} asset={meta} />
      ))}
    </div>
  );
}

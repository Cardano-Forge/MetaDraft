import { type Metadata } from "~/lib/db/types";

import Card from "./card";
import Footer from "../footer";

type GridViewProps = {
  metadata: Metadata["data"][];
  page: number;
};

export default function GridView({ metadata, page }: GridViewProps) {
  return (
    <>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4">
        {metadata[page - 1]?.map((meta) => (
          <Card key={meta.assetName} asset={meta} />
        ))}
      </div>
      <Footer page={page} lastPage={metadata.length} />
    </>
  );
}

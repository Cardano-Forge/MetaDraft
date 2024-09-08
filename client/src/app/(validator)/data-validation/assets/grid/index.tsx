import { type Metadata } from "~/lib/db/types";

import Card from "./card";
import { useSearchParams } from "next/navigation";
import { getPageFromParams } from "~/lib/get-page-from-param";

type GridViewProps = {
  metadata: Metadata["data"][];
};

export default function GridView({ metadata }: GridViewProps) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadata.length);

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {metadata[page - 1]?.map((meta) => (
        <Card key={meta.assetName} asset={meta} />
      ))}
    </div>
  );
}
 
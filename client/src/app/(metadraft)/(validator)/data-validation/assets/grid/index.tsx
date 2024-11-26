import { useSearchParams } from "next/navigation";

import Card from "./card";
import { getPageFromParams } from "~/lib/get/get-page-from-param";
import type { MetadataCollection } from "~/lib/types";
import { Typography } from "~/components/typography";

export default function GridView({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadatas.length);

  if (metadatas?.length === 0)
    return (
      <div className="flex p-4">
        <Typography as="code">No results found</Typography>
      </div>
    );

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {metadatas[page - 1]?.map((meta) => (
        <Card key={meta.id} metadata={meta} />
      ))}
    </div>
  );
}

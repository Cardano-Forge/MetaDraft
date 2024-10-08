import Card from "./card";
import { useSearchParams } from "next/navigation";
import { getPageFromParams } from "~/lib/get/get-page-from-param";
import type { MetadataCollection } from "~/lib/types";

export default function GridView({
  metadatas,
}: {
  metadatas: MetadataCollection[][];
}) {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const page = getPageFromParams(currentPage, metadatas.length);

  return (
    <div className="grid grid-flow-row grid-cols-2 gap-4 px-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {metadatas[page - 1]?.map((meta) => (
        <Card key={meta.id} metadata={meta} />
      ))}
    </div>
  );
}

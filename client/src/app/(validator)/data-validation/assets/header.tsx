import ViewButton from "~/components/view-button";

import SelectAll from "./grid/select-all";
import SearchBar from "./search-bar";
import { useSearchParams } from "next/navigation";
import { useRxData } from "rxdb-hooks";
import type { Metadata } from "~/lib/db/types";
import { useActiveProject } from "~/providers/active-project.provider";
import Loader from "~/components/loader";
import { chunk } from "~/lib/chunk";

export default function Header() {
  const activeProject = useActiveProject();
  const { result, isFetching } = useRxData<Metadata>("metadata", (collection) =>
    collection.findByIds([activeProject?.metadataId ?? ""]),
  );
  // const searchParams = useSearchParams();

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  const metadata = result[0]?.data;
  // const view = searchParams.get("view");
  // const isGridView = view === "grid";

  if (!activeProject || !metadata) return <div>No data found.</div>;

  const pagedMetadata = chunk(metadata, 10);

  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2">
        <ViewButton view="table" />
        <ViewButton view="grid" />
        {/* <FilterButton /> */}
        {/* {isGridView && <SelectAll metadata={pagedMetadata} />} */}
      </div>
      <SearchBar />
    </div>
  );
}

import ViewButton from "~/components/view-button";

import SelectAll from "./grid/select-all";
import SearchBar from "./search-bar";
import { useSearchParams } from "next/navigation";

export default function Header() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");
  const isGridView = view === "grid";

  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2">
        <ViewButton view="table" />
        <ViewButton view="grid" />
        {/* <FilterButton /> */}
        {isGridView && <SelectAll />}
      </div>
      <SearchBar />
    </div>
  );
}

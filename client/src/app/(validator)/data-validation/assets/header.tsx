import ViewButton from "~/components/view-button";

import { useActiveProject } from "~/providers/active-project.provider";
import SearchBar from "./search-bar";
import SortButton from "~/components/sort-button";
import AddAssetButton from "~/components/add-asset-button";
import { type Dispatch, type SetStateAction } from "react";

export default function Header({
  handleLoading,
}: {
  handleLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const activeProject = useActiveProject();
  if (!activeProject) return <div>No data found.</div>;

  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2">
        <ViewButton view="table" />
        <ViewButton view="grid" />
        <SortButton />
      </div>
      <div className="flex flex-row items-center gap-4 p-2">
        <AddAssetButton handleLoading={handleLoading} />
        <SearchBar />
      </div>
    </div>
  );
}

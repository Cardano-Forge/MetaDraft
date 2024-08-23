import React from "react";
import SearchBar from "./search-bar";
import ViewButton from "~/components/view-button";

export default function Header() {
  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2">
        <ViewButton view="table" />
        <ViewButton view="grid" />
        {/* <FilterButton /> */}
      </div>
      <SearchBar />
    </div>
  );
}

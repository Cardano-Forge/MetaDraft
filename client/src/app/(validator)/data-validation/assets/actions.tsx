import React from "react";
import FilterButton from "~/components/filter-button";
import ViewButton from "~/components/view-button";

export default function Actions() {
  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <ViewButton view="table" />
      <ViewButton view="grid" />
      <FilterButton />
    </div>
  );
}

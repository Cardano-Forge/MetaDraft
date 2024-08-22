import React from "react";
import { Input } from "~/components/ui/input";
import SearchIcon from "~/icons/search.icon";

export default function SearchBar() {
  // TODO - add quick action + search on keyPress Enter
  return (
    <div className="relative">
      <Input
        type="text"
        placeholder="Search by asset name of ID"
        className="h-[50px] w-[320px] rounded-xl border-transparent bg-secondary pl-12 pr-14 focus-visible:ring-1 focus-visible:ring-border/40 focus-visible:ring-offset-1"
      />
      <SearchIcon className="absolute left-[18px] top-[18px] h-4 w-4" />
    </div>
  );
}

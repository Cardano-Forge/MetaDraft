import React from "react";
import { Input } from "~/components/ui/input";
import SearchIcon from "~/icons/search.icon";

export default function Header() {
  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2"></div>
      <div className="relative">
        <Input
          type="text"
          disabled
          maxLength={64}
          placeholder="Search by rule name"
          className="h-[50px] w-[320px] rounded-xl border-transparent bg-secondary pl-12 pr-14 focus-visible:ring-1 focus-visible:ring-border/40 focus-visible:ring-offset-1"
        />
        <SearchIcon className="absolute left-[18px] top-[18px] h-4 w-4" />
      </div>
    </div>
  );
}

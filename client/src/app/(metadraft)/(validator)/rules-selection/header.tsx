"use client";

import { type ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "~/components/ui/input";
import SearchIcon from "~/icons/search.icon";
import ViewButton from "~/components/view-button";

export default function Header() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search");
  const [search, setSearch] = useState<string>(searchTerm ?? "");

  const debounced = useDebouncedCallback((text: string) => {
    const url = new URL(window.location.href);
    text.length === 0
      ? url.searchParams.delete("search")
      : url.searchParams.set("search", text);
    url.searchParams.delete("page"); // return to first page
    router.push(url.toString());
  }, 300);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setSearch(text);
    debounced(text.trim());
  };
  return (
    <div className="mb-4 flex flex-row items-center justify-between px-4 pt-4">
      <div className="flex flex-row items-center gap-2 p-2">
        <ViewButton view="table" defaultView="grid" />
        <ViewButton view="grid" defaultView="grid" />
      </div>
      <div className="relative">
        <Input
          type="text"
          value={search}
          maxLength={64}
          placeholder="Search by rule name"
          className="h-[50px] w-[320px] rounded-xl border-transparent bg-secondary pl-12 pr-14 focus-visible:ring-1 focus-visible:ring-border/40 focus-visible:ring-offset-1"
          onChange={handleSearch}
        />
        <SearchIcon className="absolute left-[18px] top-[18px] h-4 w-4" />
      </div>
    </div>
  );
}

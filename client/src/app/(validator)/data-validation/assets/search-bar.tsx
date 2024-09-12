import { type ChangeEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { Input } from "~/components/ui/input";
import SearchIcon from "~/icons/search.icon";

export default function SearchBar() {
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
    debounced(text);
  };

  return (
    <div className="relative">
      <Input
        type="text"
        value={search}
        placeholder="Search by asset name or ID"
        className="h-[50px] w-[320px] rounded-xl border-transparent bg-secondary pl-12 pr-14 focus-visible:ring-1 focus-visible:ring-border/40 focus-visible:ring-offset-1"
        onChange={handleSearch}
      />
      <SearchIcon className="absolute left-[18px] top-[18px] h-4 w-4" />
    </div>
  );
}

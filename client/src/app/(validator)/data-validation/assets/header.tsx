import React from "react";
import Actions from "./actions";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between px-4 pt-4 mb-4">
      <Actions />
      <SearchBar />
    </div>
  );
}

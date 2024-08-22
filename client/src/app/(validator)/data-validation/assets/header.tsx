import React from "react";
import Actions from "./actions";
import SearchBar from "./search-bar";

export default function Header() {
  return (
    <div className="flex flex-row items-center justify-between">
      <Actions />
      <SearchBar />
    </div>
  );
}

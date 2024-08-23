import React from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

type FooterProps = {
  page: number;
  lastPage: number;
  setPage: (value: React.SetStateAction<number>) => void;
};

export default function Footer({ page, lastPage, setPage }: FooterProps) {
  const handlePageChange = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", page.toString());
    window.history.replaceState({}, "", url.toString()); // Update the URL without reloading the page
    setPage(page);
  };

  return (
    <div className="flex flex-row items-center justify-between px-4 py-2">
      <div className="flex flex-row items-center gap-2">
        <Button
          disabled={page === 1}
          className="px-6"
          variant={"outline"}
          onClick={() => handlePageChange(page - 1)}
        >
          Previous
        </Button>
        <Button
          disabled={page === lastPage}
          className="px-6"
          variant={"secondary"}
          onClick={() => handlePageChange(page + 1)}
        >
          Next
        </Button>
      </div>
      <div className="flex flex-row items-center justify-end gap-2 p-4">
        Page
        <Input
          className="w-14 border-border/30 bg-secondary [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          type="number"
          value={page}
          min={1}
          max={lastPage}
          onChange={(e) => handlePageChange(+e.target.value)}
        />
        of {lastPage}
      </div>
    </div>
  );
}

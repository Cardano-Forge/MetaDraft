import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { Typography } from "./typography";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CheckIcon from "~/icons/check.icon";
import SortIcon from "~/icons/sort.icon";
import XIcon from "~/icons/x.icon";
import { getSortBy } from "~/lib/get-sort-by-from-param";
import type { SortOptionKey } from "~/lib/types";
import { cn } from "~/lib/utils";

export const SortOptions: Record<SortOptionKey, string> = {
  a_z: "Name: A to Z",
  z_a: "Name: Z to A",
  errors: "Errors to Valid",
  success: "Valid to Errors",
};

const SortItem = ({
  children,
  active,
  onClick,
}: {
  children: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      className={cn(
        "flex w-full flex-row items-center justify-between text-left",
        active && "font-bold",
      )}
      onClick={onClick}
    >
      <Typography className="text-left">{children}</Typography>
      {active ? <CheckIcon className="mx-[3px]" /> : <div className="w-10" />}
    </Button>
  );
};

export default function SortButton() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortBy = searchParams.get("sort");
  const [open, setOpen] = useState<boolean>(false);
  const active = getSortBy(sortBy);

  const handleChangeView = () => setOpen((prev) => !prev);

  const handleSelection = (key: SortOptionKey) => {
    const url = new URL(window.location.href);
    // Null
    if (active === key) {
      url.searchParams.delete("sort");
    } else {
      // New Active
      url.searchParams.set("sort", key);
    }

    setOpen(false);
    router.push(url.toString());
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={open ? "default" : "outline"}
          className={cn(
            "!h-[50px] gap-4 rounded-xl p-6 !px-4 text-border/50",
            (open || !!active) &&
              "border border-white/10 bg-background text-border hover:bg-background/70",
          )}
          onClick={handleChangeView}
        >
          {open ? (
            <XIcon className="mx-[3px]" />
          ) : (
            <SortIcon className="h-5 w-5" />
          )}
          <Typography
            className={cn(
              "font-normal tracking-wide text-white",
              !!active && "font-semibold text-white/70",
            )}
          >
            {!!active ? SortOptions[active] : "Sort"}{" "}
          </Typography>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-fit flex-col rounded-xl border-white/10 bg-background p-2">
        {Object.keys(SortOptions).map((key) => (
          <SortItem
            key={key}
            active={key === active}
            onClick={() => handleSelection(key as SortOptionKey)}
          >
            {SortOptions[key as SortOptionKey]}
          </SortItem>
        ))}
      </PopoverContent>
    </Popover>
  );
}

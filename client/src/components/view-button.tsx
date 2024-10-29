import React from "react";
import { Button } from "./ui/button";
import UnorderedListIcon from "~/icons/unordered-list.icon";
import { cn } from "~/lib/utils";
import ViewGridIcon from "~/icons/view-grid.icon";
import { useSearchParams } from "next/navigation";
import { getViewFromParams } from "~/lib/get/get-view-from-param";

export type ViewOptions = "table" | "grid";

export default function ViewButton({
  view = "table",
  defaultView = "table",
}: {
  view?: ViewOptions;
  defaultView?: ViewOptions;
}) {
  const searchParams = useSearchParams();
  const currentView = getViewFromParams(searchParams.get("view"), defaultView);

  const active = currentView === view;
  const handleChangeView = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.replaceState({}, "", url.toString()); // Update the URL without reloading the page
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn(
        "h-[50px] w-[50px] rounded-xl text-border/50",
        active && "bg-secondary text-border hover:bg-secondary/70",
      )}
      onClick={handleChangeView}
    >
      {view === "table" ? <UnorderedListIcon /> : <ViewGridIcon />}
      <span className="sr-only">Change the metadata view</span>
    </Button>
  );
}

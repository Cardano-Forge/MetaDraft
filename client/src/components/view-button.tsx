import React from "react";
import { Button } from "./ui/button";
import UnorderedListIcon from "~/icons/unordered-list.icon";
import { cn } from "~/lib/utils";
import ViewGridIcon from "~/icons/view-grid.icon";
import useLocalStorage from "~/lib/hooks/use-local-storage";
import { useSearchParams } from "next/navigation";

export type ViewOptions = "table" | "grid";

export default function ViewButton({ view = "table" }: { view?: ViewOptions }) {
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view");
  const [assetView, setView] = useLocalStorage(
    "asset_view",
    currentView ?? "table",
  );

  const active = assetView === view;
  const handleChangeView = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", view);
    window.history.replaceState({}, "", url.toString()); // Update the URL without reloading the page
    setView(view);
  };

  return (
    <Button
      variant={"outline"}
      size={"icon"}
      className={cn(
        "h-[50px] w-[50px] rounded-lg text-border/50",
        active && "bg-secondary text-border hover:bg-secondary/70",
      )}
      onClick={handleChangeView}
    >
      {view === "table" ? <UnorderedListIcon /> : <ViewGridIcon />}
    </Button>
  );
}

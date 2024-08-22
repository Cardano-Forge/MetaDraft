import React from "react";
import { Button } from "./ui/button";
import UnorderedListIcon from "~/icons/unordered-list.icon";
import { cn } from "~/lib/utils";
import ViewGridIcon from "~/icons/view-grid.icon";
import useLocalStorage from "~/lib/hooks/use-local-storage";

export type ViewOptions = "table" | "grid";

export default function ViewButton({ view = "table" }: { view?: ViewOptions }) {
  const [assetView, setView] = useLocalStorage("asset_view", "table");

  const active = assetView === view;
  const handleChangeView = () => setView(view);

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

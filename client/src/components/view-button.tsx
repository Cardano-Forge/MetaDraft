import React, { useState } from "react";
import { Button } from "./ui/button";
import UnorderedListIcon from "~/icons/unordered-list.icon";
import { cn } from "~/lib/utils";
import ViewGridIcon from "~/icons/view-grid.icon";

export type ViewOptions = "table" | "grid";

export default function TableViewButton({
  view = "table",
}: {
  view?: ViewOptions;
}) {
  const [active, setActive] = useState<boolean>(false);
  const handleChangeView = () => setActive((prev) => !prev);

  // TODO - maybe better to handle state here when PouchDB is ready (offline DB), get view like { asset_view: "table" | "grid" }
  // const [active, setActive] = useState<boolean>(asset_view === view);
  // const handleActiveState = () => {
  //   if(view === active) return;
  // TODO - save offline DB ~> this should re-render both button to keep only one view active
  // }

  return (
    <Button
      variant={active ? "default" : "outline"}
      size={"icon"}
      className={cn(
        "rounded-lg text-border/50",
        active && "bg-secondary text-border hover:bg-secondary/70",
      )}
      onClick={handleChangeView}
    >
      {view === "table" ? <UnorderedListIcon /> : <ViewGridIcon />}
    </Button>
  );
}

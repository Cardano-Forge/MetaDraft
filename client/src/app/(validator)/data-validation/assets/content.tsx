import React from "react";
import useLocalStorage from "~/lib/hooks/use-local-storage";

type ContentProps = {
  metadata: object;
};

export default function Content({}: ContentProps) {
  const [assetView] = useLocalStorage("asset_view", "table");
  if (assetView === "table") return <div>TABLE</div>;
  return <div>GRID</div>;
}

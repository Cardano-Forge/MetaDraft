import React from "react";
import useLocalStorage from "~/lib/hooks/use-local-storage";

type IMetadata = Record<string, Record<string, unknown>>[];

type ContentProps = {
  metadata: IMetadata;
};

export default function Content({ metadata }: ContentProps) {
  const [assetView] = useLocalStorage("asset_view", "table");

  if (assetView === "table")
    return (
      <div>
        {metadata.slice(0, 10).map((meta, i) => {
          const key = Object.keys(meta)[0];
          if (key && meta[key]) {
            console.log(meta[key]);
            return <div key={key}>{meta[key].name as string}</div>;
          }
        })}
      </div>
    );
  return <div>GRID</div>;
}

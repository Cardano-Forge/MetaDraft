import { type MetatdataJSON } from "../types";
import useLocalStorage from "./use-local-storage";

export const useSelectedAssets = () => {
  const [assets, setAssets] = useLocalStorage<MetatdataJSON>(
    "selected_assets",
    [],
  );

  const selectAll = (all: MetatdataJSON) => setAssets(all);

  const handleAddOrRemove = (asset: MetatdataJSON[number]) => {
    if (isSelected(asset)) {
      const removed = assets.filter((a) => a.assetName !== asset.assetName);
      setAssets(removed);
    } else {
      setAssets([...assets, asset]);
    }
  };

  const clear = () => setAssets([]);

  const isSelected = (asset: MetatdataJSON[number]) => {
    return !!assets.find((a) => a.assetName === asset.assetName);
  };

  return { assets, selectAll, handleAddOrRemove, clear, isSelected };
};

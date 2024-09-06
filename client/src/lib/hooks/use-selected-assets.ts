import { type MetatdataJSON } from "../types";
import useLocalStorage from "./use-local-storage";

/**
 * A custom hook for managing the selection of assets using local storage.
 * It allows adding, removing, selecting all, and clearing selected assets.
 *
 * @returns {Object} - An object containing:
 *   - `assets`: {MetatdataJSON[]} The list of selected assets.
 *   - `selectAll`: {Function} A function to select all assets.
 *   - `handleAddOrRemove`: {Function} A function to add or remove an asset from the selection.
 *   - `clear`: {Function} A function to clear all selected assets.
 *   - `isSelected`: {Function} A function to check if an asset is currently selected.
 */
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

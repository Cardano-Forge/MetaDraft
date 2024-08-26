import useLocalStorage from "./use-local-storage";

export const useSelectedAssets = () => {
  const [assets, setAssets] = useLocalStorage<Record<string, unknown>[]>(
    "selected_assets",
    [],
  );

  const selectAll = (all: Record<string, unknown>[]) => setAssets(all);

  const handleAddOrRemove = (asset: Record<string, unknown>) => {
    if (isSelected(asset)) {
      const removed = assets.filter((a) => a.name !== asset.name);
      setAssets(removed);
    } else {
      setAssets([...assets, asset]);
    }
  };

  const clear = () => setAssets([]);

  const isSelected = (asset: Record<string, unknown>) => {
    return !!assets.find((a) => a.name === asset.name);
  };

  return { assets, selectAll, handleAddOrRemove, clear, isSelected };
};

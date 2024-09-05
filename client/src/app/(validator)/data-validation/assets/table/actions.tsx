import { Button } from "~/components/ui/button";
import ArrowRightIcon from "~/icons/arrow-right.icon";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import useAssetState from "~/lib/hooks/use-asset-state";
import { useSelectedAssets } from "~/lib/hooks/use-selected-assets";
import { type Status } from "~/lib/types";

type ActionsType = {
  state: Status;
  assetName: string;
};

export default function Actions({ state, assetName }: ActionsType) {
  const isSuccess = state === "success";
  const isWarning = state === "warning";
  const { updateState } = useAssetState();
  const { assets } = useSelectedAssets();

  const handleUpdateState = async (state: Status) => {
    const assetNames = [assetName];

    assets.forEach((asset) => {
      if (!assetNames.includes(asset.assetName)) {
        assetNames.push(asset.assetName);
      }
    });

    await updateState(assetNames, state);
  };

  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <Button
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={async () => {
          await handleUpdateState("warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={async () => {
          await handleUpdateState("success");
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Button
        size={"icon"}
        variant={"outline"}
        className="border-white/50"
        disabled
      >
        <ArrowRightIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

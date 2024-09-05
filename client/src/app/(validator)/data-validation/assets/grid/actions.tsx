import { Button } from "~/components/ui/button";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import useAssetState from "~/lib/hooks/use-asset-state";
import { type Status } from "~/lib/types";

type ActionsType = {
  state: Status;
  assetName: string;
};

export default function Actions({ state, assetName }: ActionsType) {
  const isSuccess = state === "success";
  const isWarning = state === "warning";
  const { updateState } = useAssetState();

  return (
    <div className="flex flex-row items-center gap-2">
      <Button
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={async () => {
          await updateState(assetName, "warning");
        }}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={async () => {
          await updateState(assetName, "success");
        }}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}

import { Button } from "~/components/ui/button";
import ArrowRightIcon from "~/icons/arrow-right.icon";
import CheckIcon from "~/icons/check.icon";
import FlagIcon from "~/icons/flag.icon";
import { type Status } from "~/lib/types";

type ActionsType = {
  state: Status;
};

export default function Actions({ state }: ActionsType) {
  const isSuccess = state === "success";
  const isWarning = state === "warning";

  return (
    <div className="flex flex-row items-center gap-2 p-2">
      <Button
        variant={isWarning ? "warning" : "warningOutilne"}
        size={"icon"}
        onClick={() => alert("Should set this asset status to WARNING")}
      >
        <FlagIcon className="h-4 w-4" />
      </Button>
      <Button
        variant={isSuccess ? "success" : "successOutline"}
        size={"icon"}
        onClick={() => alert("Should set this asset status to SUCCESS")}
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

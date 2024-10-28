import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import FlagIcon from "~/icons/flag.icon";
import { type Status } from "~/lib/types";

export default function FlaggedButton({
  isUnchecked,
  isWarning,
  handleStatusUpdate,
}: {
  isUnchecked: boolean;
  isWarning: boolean;
  handleStatusUpdate: (state: Status) => Promise<void>;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            title="Mark as flagged"
            disabled={isUnchecked}
            variant={isWarning ? "warning" : "warningOutilne"}
            size={"icon"}
            onClick={async () => {
              await handleStatusUpdate("warning");
            }}
          >
            <FlagIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-97 flex flex-col gap-2 text-balance border-white/20 p-4 text-center">
          <Typography as="smallText">{`Mark this asset as error-flagged.`}</Typography>
          <Typography as="smallText">{`If it is already flagged, it will be marked as an error.`}</Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

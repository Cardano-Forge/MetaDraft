import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import CheckIcon from "~/icons/check.icon";
import { type Status } from "~/lib/types";

export default function ValidButton({
  isUnchecked,
  isSuccess,
  handleStatusUpdate,
}: {
  isUnchecked: boolean;
  isSuccess: boolean;
  handleStatusUpdate: (state: Status) => Promise<void>;
}) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger asChild>
          <Button
            title="Mark as valid"
            disabled={isUnchecked}
            variant={isSuccess ? "success" : "successOutline"}
            size={"icon"}
            onClick={async () => {
              await handleStatusUpdate("success");
            }}
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-97 flex flex-col gap-2 text-balance border-white/20 p-4 text-center">
          <Typography as="smallText">{`Mark this asset as valid.`}</Typography>
          <Typography as="smallText">{`If it is already valid, it will be marked as an error.`}</Typography>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

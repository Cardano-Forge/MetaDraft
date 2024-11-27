import ExclamationIcon from "~/icons/exclamation.icon";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Typography } from "./typography";

export default function StatusDescription() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"warningOutilne"}
          title="Open modal for status description"
        >
          <ExclamationIcon />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Status</DialogTitle>
          <DialogDescription>
            <Typography as="mutedText">
              Here, we explain the meaning of each status.
            </Typography>
          </DialogDescription>
        </DialogHeader>
        <hr />
        <div className="flex flex-col gap-4">
          <Typography as="h5" className="text-destructive">
            Error Detected
          </Typography>
          <Typography as="code">
            Errors detected are critical. This means your metadata for this
            asset will not be valid on the blockchain, such as having a
            duplicate asset name or missing required fields like the image or
            name. These errors occur when the metadata does not comply with the
            associated CIP standards.
          </Typography>
          <hr />
          <Typography as="h5" className="text-warning">
            Error Flagged
          </Typography>
          <Typography as="code">
            Error flagged are more like warnings that indicate potential issues
            with your metadata. For example, this may happen if your key-value
            pairs have inconsistent text formats across your assets, or if there
            are typos in the key-value pairs within the same asset. It can also
            flag issues if an array contains mixed types. Additionally, it may
            warn you if an asset has keys that differ from those of the other
            assets.
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

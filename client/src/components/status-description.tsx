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
import InformationCircle from "~/icons/information-circle";

export default function StatusDescription() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          title="Open modal for status description"
        >
          <InformationCircle />
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
            Errors Detected: Critical issues in your metadata that make it
            invalid on the blockchain.
          </Typography>
          <Typography as="code">
            Examples:
            <li>Duplicate asset name.</li>
            <li>Missing required fields (e.g., image, name).</li>
            <li>Non-compliance with CIP standards.</li>
          </Typography>
          <hr />
          <Typography as="h5" className="text-warning">
            Error Flagged
          </Typography>
          <Typography as="code">
            Error Flagged: Warnings indicating potential issues in your
            metadata.
          </Typography>
          <Typography as="code">
            Examples:
            <li>Inconsistent text formats across key-value pairs.</li>
            <li>Typos in key-value pairs within the same asset.</li>
            <li>Mixed types in the same array.</li>
            <li>Keys in an asset that differ from other assets.</li>
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
}

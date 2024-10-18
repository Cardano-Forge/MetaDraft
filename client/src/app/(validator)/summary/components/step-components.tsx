import { Typography } from "~/components/typography";
import CheckCircleIcon from "~/icons/check-circle.icon";
import ExclamationIcon from "~/icons/exclamation.icon";
import InformationCircle from "~/icons/information-circle";
import SummaryIcon from "~/icons/summary.icon";
import { type Status } from "~/lib/types";
import { cn } from "~/lib/utils";

export function StepComponent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-background p-4">
      {children}
    </div>
  );
}

export function StepHeader({
  step = 1,
  title,
  status = "success",
}: {
  step?: number;
  title: string;
  status?: Status;
}) {
  return (
    <>
      <div className="flex flex-row items-center justify-between px-2">
        <div className="flex flex-col">
          <Typography className="text-white/50">{`Step ${step}`}</Typography>
          <Typography as="h3">{title}</Typography>
        </div>
        <StepStatus status={status} />
      </div>
      <hr className="border-white/20" />
    </>
  );
}

const statusClassName: Record<Status, string> = {
  success: "text-success",
  warning: "text-warning",
  error: "text-destructive",
  unchecked: "text-white/50",
};

const icons: Record<Status, React.ReactNode> = {
  success: <CheckCircleIcon className="h-8 w-8" />,
  warning: <InformationCircle className="h-8 w-8" />,
  error: <ExclamationIcon className="h-8 w-8" />,
  unchecked: <SummaryIcon className="h-8 w-8" />,
};

const text: Record<Status, string> = {
  success: "Validated",
  warning: "Recommandation",
  error: "Error detected",
  unchecked: "Unchecked",
};

export function StepStatus({ status }: { status: Status }) {
  return (
    <Typography
      className={cn(
        "flex flex-row items-center gap-4 tracking-wide",
        statusClassName[status],
      )}
    >
      {text[status]} {icons[status]}
    </Typography>
  );
}

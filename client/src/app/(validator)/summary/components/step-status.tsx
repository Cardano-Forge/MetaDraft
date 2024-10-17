import React from "react";
import { Typography } from "~/components/typography";
import CheckCircleIcon from "~/icons/check-circle.icon";
import { type Status } from "~/lib/types";

const icons: Record<Status, React.ReactNode> = {
  success: <CheckCircleIcon className="h-8 w-8" />,
  warning: "",
  error: "",
  unchecked: "",
};

const text: Record<Status, string> = {
    success: "Validated",
    warning: "Recommandation",
    error: "Error",
    unchecked: ""
}

export default function StepStatus({ status }: { status: Status }) {
  return (
    <Typography className="flex flex-row items-center gap-4 tracking-wide text-success">
      Validated {icons[status]}
    </Typography>
  );
}

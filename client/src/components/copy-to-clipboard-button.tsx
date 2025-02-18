"use client";

import { CopyIcon } from "lucide-react";
import React from "react";

import { Button } from "./ui/button";
import CheckIcon from "~/icons/check.icon";

export const CopyButton = ({
  data,
  className,
}: {
  data: string;
  className?: string;
}) => {
  const [hasCopied, setHasCopied] = React.useState<boolean>(false);
  const handleClick = () => {
    navigator.clipboard
      .writeText(data)
      .then(() => setHasCopied(true))
      .catch(() => setHasCopied(false));
  };
  return (
    <Button
      variant="ghost"
      size="icon"
      className={className}
      title="Copy to clipboard"
      onClick={handleClick}
    >
      {hasCopied ? (
        <CheckIcon className="h-5 w-5" />
      ) : (
        <CopyIcon className="h-5 w-5" />
      )}
      <span className="sr-only">Copy to clipboard</span>
    </Button>
  );
};

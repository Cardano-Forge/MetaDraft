"use client";

import React from "react";
import Loader from "~/components/loader";
import { useValidations } from "~/lib/hooks/use-validations";
import ValidatorStats from "./validator-stats";

export default function Summary() {
  const { isFetching } = useValidations();

  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <ValidatorStats />
    </div>
  );
}

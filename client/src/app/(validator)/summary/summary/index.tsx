"use client";

import React from "react";
import ValidatorStats from "./validator-stats";

export default function Summary() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <ValidatorStats />
    </div>
  );
}

"use client";

import DataValidation from "./components/data-validation";
import MetadataStructure from "./components/metadata-structure";
import RulesSelection from "./components/rules-selection";

export default function Content() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-card p-4">
      <MetadataStructure />
      <RulesSelection />
      <DataValidation />
    </div>
  );
}

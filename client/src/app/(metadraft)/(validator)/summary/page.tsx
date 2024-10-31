import { Typography } from "~/components/typography";

import ExportButton from "./export-button";
import Content from "./content";

export default function SummaryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Project summary</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Double check that everything is correct. Finalize all issues/errors
            before exporting.
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          <ExportButton />
        </div>
      </div>
      <Content />
    </div>
  );
}

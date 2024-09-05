import { Typography } from "~/components/typography";
import Summary from "./summary";

export default function SummaryPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-col gap-4">
          <Typography as="h2">Project summary</Typography>
          <Typography as="p" className="text-sm text-white/50">
            Small description lorem ipsum dolor
          </Typography>
        </div>
        <div className="flex flex-row items-center gap-4">
          {/* Add buttons here */}
        </div>
      </div>
      <Summary />
    </div>
  );
}

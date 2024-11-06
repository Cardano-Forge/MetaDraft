import { StepComponent, StepHeader } from "./step-components";
import ValidatorStats from "./validator-stats";
import MessageBox from "~/components/message-box";
import Stat from "~/components/stat";
import type { ProjectCollection } from "~/lib/types";
import { useActiveProject } from "~/providers/active-project.provider";


export default function DataValidation() {
  const activeProject = useActiveProject();
  const project = activeProject?.toJSON() as ProjectCollection;

  const hasError = !!project.errorsDetected;
  const hasWarning = !!project.errorsFlagged;
  const hasUnchecked = !!project.unchecked;
  const status = hasError
    ? "error"
    : hasWarning
      ? "warning"
      : hasUnchecked
        ? "unchecked"
        : "success";

  return (
    <StepComponent>
      <StepHeader title="NFTs data validation" step={3} status={status} />
      <div className="flex flex-row gap-10 p-4">
        <Stat icon="database" stat={project.nfts}>
          NFTs in this collection
        </Stat>
        <Stat icon="clock" stat={project.unchecked}>
          NFTs unchecked
        </Stat>
        <Stat icon="exclamation" stat={project.errorsDetected} variant="error">
          Errors detected
        </Stat>
        <Stat icon="flag" stat={project.errorsFlagged} variant="warning">
          Errors flagged
        </Stat>
        <Stat icon="check" stat={project.valids} variant="success">
          Marked as valid
        </Stat>
      </div>
      {hasError && (
        <MessageBox variant="error">
          We still detect some errors in this step. Make sure you correct them
          before exporting your project.
        </MessageBox>
      )}
      {hasWarning && (
        <MessageBox>
          We still see some flagged errors in this step. Make sure you check
          them before exporting your project.
        </MessageBox>
      )}
      <ValidatorStats />
    </StepComponent>
  );
}

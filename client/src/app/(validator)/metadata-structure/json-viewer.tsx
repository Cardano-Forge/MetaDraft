import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { type CIP25 } from "~/lib/types";

export default function JSONViewer({ json }: { json: CIP25 | undefined }) {
  if (!json) return null;
  return (
    <div className="flex flex-col rounded-2xl bg-card p-4">
      <JsonView
        data={json}
        shouldExpandNode={allExpanded}
        style={{ ...defaultStyles, container: `${defaultStyles.container} p-4 rounded-xl` }}
      />
    </div>
  );
}

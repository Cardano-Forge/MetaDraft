import { JsonView, allExpanded, defaultStyles } from "react-json-view-lite";
import "react-json-view-lite/dist/index.css";
import { getObjectStructureWithTypes } from "~/lib/get/get-object-structure-with-types";
import type { Structure, CIP25 } from "~/lib/types";

export default function JSONViewer({
  json,
  structure,
}: {
  json: CIP25 | undefined;
  structure: Structure;
}) {
  if (!json || !structure) return null;
  const _JSON = getObjectStructureWithTypes(json);
  console.log(_JSON);
  return (
    <div className="flex flex-col rounded-2xl bg-card p-4">
      <JsonView
        data={_JSON}
        shouldExpandNode={allExpanded}
        style={{
          ...defaultStyles,
          container: `${defaultStyles.container} p-4 rounded-xl`,
        }}
      />
    </div>
  );
}

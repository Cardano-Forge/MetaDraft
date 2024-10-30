import { Typography } from "~/components/typography";
import { Accordion } from "~/components/ui/accordion";

import WhatAreType from "./what-are-type";
import WhatAreString from "./what-are-string";
import WhatAreNumber from "./what-are-number";
import WhatAreObject from "./what-are-object";
import WhatAreArray from "./what-are-array";
import DefaultIsValue from "./default-is-value";
import IncrementalName from "./incremental-name";
import WhatHappenWhenAddOrRemove from "./what-happen-when-add-or-remove";

export default function HowToCreateMetadataSchema() {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-secondary p-4">
      <Typography as="h3">FAQ</Typography>
      <Accordion type="single" collapsible>
        <WhatAreType />
        <DefaultIsValue />
        <IncrementalName />
        <WhatHappenWhenAddOrRemove />
        <WhatAreString />
        <WhatAreNumber />
        <WhatAreObject />
        <WhatAreArray />
      </Accordion>
    </div>
  );
}

"use client";

import { useRxCollection } from "rxdb-hooks";
import { Typography } from "~/components/typography";
import { Button } from "~/components/ui/button";
import { Metadata } from "~/lib/db/types";
import { doStuff } from "~/server/validations";

export default function DataValidation() {
  const handleValidation = async () => {
    // if (metadataCollection) {
      // const res = await doStuff(metadataCollection);
      // console.log("VALIDATION : ", res);
    // }
  };
  return (
    <>
      <Typography as="h2">Data Validation</Typography>
      <Typography as="p" className="text-sm text-white/50">
        step desc
      </Typography>
      <Button onClick={handleValidation}>Validate</Button>
    </>
  );
}

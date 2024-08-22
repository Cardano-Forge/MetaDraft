"use client";

import { useState } from "react";
import { useRxCollection, useRxQuery } from "rxdb-hooks";
import Loader from "~/components/loader";
import { Button } from "~/components/ui/button";
import { type Metadata } from "~/lib/db/types";
import { doStuff } from "~/server/validations";
import Header from "./header";
import Content from "./content";

export default function Assets() {
  const [results, setResults] = useState<string | undefined>(undefined);
  const metadataCollection = useRxCollection<Metadata>("metadata");
  const query = metadataCollection?.find();
  const { result, isFetching } = useRxQuery(query);

  const metadata = result[0]?.data;
  if (isFetching)
    return (
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    );
  if (!metadata) return <div>No data found.</div>;

  const handleValidation = async () => {
    const res = await doStuff(metadata);
    setResults(res);
  };

  console.log("VALIDATION : ", results);

  return (
    <>
      <Button onClick={handleValidation}>Validate</Button>
      <div className="flex flex-col gap-4 rounded-2xl bg-card p-4">
        <Header />
        <Content metadata={metadata} />
      </div>
    </>
  );
}

import React from "react";
import { type Metadata } from "~/lib/db/types";
import Footer from "../footer";
import Card from "./card";

type GridViewProps = {
  metadata: Metadata["data"][];
  page: number;
  setPage: (value: React.SetStateAction<number>) => void;
};

export default function GridView({ metadata, page, setPage }: GridViewProps) {
  return (
    <>
      <div className="grid grid-flow-col grid-rows-2 gap-4 px-4">
        {metadata[page - 1]?.map((meta) => (
          <Card key={meta.name as string} asset={meta} />
        ))}
      </div>
      <Footer page={page} lastPage={metadata.length} setPage={setPage} />
    </>
  );
}

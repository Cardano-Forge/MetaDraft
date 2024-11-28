"use client";

import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import { CopyButton } from "./copy-to-clipboard-button";
import { Button } from "./ui/button";

const example = `

  [
    { 
      "assetName": <string>
      "metadata": {
        "name": <string>, [REQUIRED]
        "image": <uri | array>, [REQUIRED]
        "mediaType": image/<mime_sub_type>,
        "description": <string | array>,
        "files": [{
          "name": <string>,
          "mediaType": <mime_type>,
          "src": <uri | array>,
          <other_properties>
        }],
        <other properties>
      }
    },
    ...
  ]`;

export const MetadataTemplate = () => {
  const downloadExample = () => {
    const link = document.createElement("a");
    link.href = "/metadraft_example.json";
    link.download = "metadraft_example.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={"relative rounded-2xl border border-input/20 bg-card"}>
      <pre className="custom-scroll overflow-scroll p-3">
        <code>
          {`// example of JSON file data`}
          {example}
        </code>
      </pre>
      <Button
        variant={"secondary"}
        size={"sm"}
        className="w-full rounded-none hover:bg-secondary/50"
        onClick={downloadExample}
      >
        Download Example
      </Button>
      <div className="w-full rounded-b-2xl bg-background/60 px-3 py-1 text-center">
        <Link
          href="https://cips.cardano.org/cip/CIP-25#general-structure"
          className="flex items-center justify-center font-semibold"
        >
          From CIP-25
          <ExternalLinkIcon className="ml-1 inline p-[2px]" />
        </Link>
      </div>
      <CopyButton
        data={example}
        className="absolute right-2 top-2 text-border/60"
      />
    </div>
  );
};

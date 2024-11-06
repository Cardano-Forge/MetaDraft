"use client";

import { useRef, useState } from "react";
import { useRxCollection } from "rxdb-hooks";

import Loader from "./loader";
import { Typography } from "./typography";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import DocumentAddIcon from "~/icons/document-add.icon";
import { DEFAULT_CIP25_SCHEMA, DEFAULT_RULES } from "~/lib/constant";
import type {
  MetadataSchemaCollection,
  ProjectCollection,
  RulesCollection,
} from "~/lib/types";

export default function CreateProjectButton() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const metadataSchemaCollection =
    useRxCollection<MetadataSchemaCollection>("metadataSchema");
  const activeProjectCollection = useRxCollection<ProjectCollection>("project");
  const rulesCollection = useRxCollection<RulesCollection>("rules");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      if (inputRef.current?.value) {
        // Add project information in RXDB
        const project = await activeProjectCollection?.upsert({
          id: self.crypto.randomUUID(),
          name: inputRef.current.value,
          nfts: 0,
          unchecked: 0,
          errorsDetected: 0,
          errorsFlagged: 0,
          valids: 0,
        });

        if (project) {
          // Add Default Rules
          await rulesCollection?.upsert({
            id: project.id,
            rules: DEFAULT_RULES,
          });

          await metadataSchemaCollection?.upsert({
            id: "schema",
            schema: DEFAULT_CIP25_SCHEMA,
          });
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex min-h-[450px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl border border-input/20 bg-card/70">
        <Loader />
      </div>
    );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          className="flex min-h-[450px] w-full min-w-[300px] cursor-pointer flex-col items-center justify-center gap-8 rounded-2xl bg-card hover:bg-card/70"
          role="button"
        >
          <DocumentAddIcon />
          <div className="flex flex-col items-center justify-center gap-4">
            <Typography as={"largeText"} className="font-inter text-2xl">
              Create a new project
            </Typography>
            <Typography as={"mutedText"} className="font-normal">
              Click here to create a project from scratch
            </Typography>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="border-none">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold tracking-tight sm:text-2xl md:text-3xl">
            Create new project
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Input
            ref={inputRef}
            className="border-white/30 placeholder:text-white/20"
            placeholder="Project name..."
          />
          <div className="mt-4 flex flex-row justify-end gap-4">
            <Button type="submit">Create</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

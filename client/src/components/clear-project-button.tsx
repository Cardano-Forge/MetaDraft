"use client";
import React from "react";
import { Button } from "./ui/button";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRxData } from "rxdb-hooks";
import { type ActiveProject } from "~/lib/db/types";

export default function ClearProjectButton() {
  const router = useRouter();
  const { result } = useRxData<ActiveProject>("activeProject", (collection) =>
    collection.findOne(),
  );

  const handleClick = async () => {
    const confirms = confirm("You will lose all current progress");
    if (confirms) {
      await result[0]?.remove();
      window.localStorage.clear();
      router.push("/");
    }
  };
  if (!result[0]) return null;
  return (
    <Button onClick={handleClick}>
      <RefreshCwIcon className="mr-2" /> New Project
    </Button>
  );
}

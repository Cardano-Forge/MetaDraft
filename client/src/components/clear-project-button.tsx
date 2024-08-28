"use client";
import React from "react";
import { Button } from "./ui/button";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActiveProject } from "~/providers/active-project.provider";

export default function ClearProjectButton() {
  const router = useRouter();
  const activeProject = useActiveProject();

  const handleClick = async () => {
    const confirms = confirm("You will lose all current progress");
    if (confirms) {
      await activeProject?.remove();
      window.localStorage.clear();
      router.push("/");
    }
  };
  if (!activeProject) return null;
  return (
    <Button onClick={handleClick}>
      <RefreshCwIcon className="mr-2" /> New Project
    </Button>
  );
}

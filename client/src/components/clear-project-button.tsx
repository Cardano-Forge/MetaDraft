"use client";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { clearActiveProject, get } from "~/app/db/db-actions";
import { RefreshCwIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ClearProjectButton() {
  const router = useRouter();
  const [show, setShow] = React.useState<boolean>(false);
  useEffect(() => {
    get("activeProject")
      .then(({ data }) => {
        if (data) {
          setShow(true);
        }
      })
      .catch(() => {
        //ignore
      });
  }, []);
  const handleClick = async () => {
    const confirms = confirm("You will lose all current progress");
    if (confirms) {
      await clearActiveProject();
      router.push("/");
    }
  };
  if (!show) return null;
  return (
    <Button onClick={handleClick}>
      <RefreshCwIcon className="mr-2" /> New Project
    </Button>
  );
}

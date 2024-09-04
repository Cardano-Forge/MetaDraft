"use client";

import { useActiveProject } from "~/providers/active-project.provider";

import Header from "./header";
import Content from "./content";

export default function Assets() {
  const activeProject = useActiveProject();

  if (!activeProject) return <div>No data found.</div>;

  return (
    <div className="flex flex-col rounded-2xl bg-card">
      <Header />
      <Content />
    </div>
  );
}

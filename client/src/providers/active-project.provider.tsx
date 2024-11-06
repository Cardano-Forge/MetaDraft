"use client";

import { usePathname, redirect } from "next/navigation";
import React from "react";
import { type RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { type ProjectCollection } from "~/lib/types";

const ActiveProjectContext = React.createContext<
  RxDocument<ProjectCollection> | undefined
>(undefined);

export const useActiveProject = () => {
  return React.useContext(ActiveProjectContext);
};

export const ActiveProjectProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  const { result, isFetching } = useRxData<ProjectCollection>(
    "project",
    (collection) => collection.find(),
  );

  if (isFetching)
    return (
      <main className="container flex h-[100vh] flex-wrap place-content-center">
        <Loader />
      </main>
    );
  if (pathname === "/" && !!result[0]?.id) redirect("/metadata-structure"); // On "/" and has active project ~> "/metadata-structure"
  if (pathname !== "/" && !result[0]) redirect("/"); // On "/:any" and has no active project ~> "/""

  if (result[0])
    return (
      <ActiveProjectContext.Provider value={result[0]}>
        {children}
      </ActiveProjectContext.Provider>
    );
  else return children;
};

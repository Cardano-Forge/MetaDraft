"use client";

import React, { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { removeRxDatabase, type RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { type ProjectCollection } from "~/lib/types";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";

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

  // State to track if the fetch is taking too long
  const [fetchTimeout, setFetchTimeout] = useState(false);

  useEffect(() => {
    // Set a timeout to change the fetchTimeout state after 8 seconds
    const timeout = setTimeout(() => {
      setFetchTimeout(true);
    }, 8000); // 8 seconds

    // Clear the timeout if the fetch is successful
    if (!isFetching) {
      clearTimeout(timeout);
    }

    return () => clearTimeout(timeout); // Cleanup the timeout on unmount
  }, [isFetching]);

  // Refresh page if stuck on isFetching for more than 8 seconds
  useEffect(() => {
    if (fetchTimeout) {
      const reset = async () => {
        await removeRxDatabase("metadraft", getRxStorageDexie());
        location.reload();
      };
      void reset();
    }
  }, [fetchTimeout]);

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

"use client";

import React, { useEffect, useState } from "react";
import { usePathname, redirect } from "next/navigation";
import { removeRxDatabase, type RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";

import Loader from "~/components/loader";
import { type ProjectCollection } from "~/lib/types";
import { Button } from "~/components/ui/button";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { Typography } from "~/components/typography";

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
  const [clearDatabase, setClearDatabaseTimmeout] = useState(false);

  useEffect(() => {
    // Set a timeout to change the fetchTimeout state after 11 seconds
    const timeout = setTimeout(() => {
      setFetchTimeout(true);
    }, 11000); // 11 seconds

    // Set a timeout to change the clearDatabase state after 3 seconds
    const timeoutClear = setTimeout(() => {
      setClearDatabaseTimmeout(true);
    }, 3000); // 3 seconds

    // Clear the timeout if the fetch is successful
    if (!isFetching) {
      clearTimeout(timeout);
      clearTimeout(timeoutClear);
    }

    // Cleanup the timeout on unmount
    return () => {
      clearTimeout(timeout);
      clearTimeout(timeoutClear);
    };
  }, [isFetching]);

  // Refresh page if stuck on isFetching for more than 11 seconds
  useEffect(() => {
    if (fetchTimeout) {
      window.location.reload();
    }
  }, [fetchTimeout]);

  const handleClick = async () => {
    try {
      await removeRxDatabase("metadraft", getRxStorageDexie());
      location.reload();
    } catch (e) {
      console.error(e);
    } finally {
    }
  };

  if (isFetching)
    return (
      <main className="container flex h-[100vh] flex-wrap place-content-center">
        <div className="flex flex-col items-center justify-center gap-4">
          {clearDatabase ? (
            <>
              <div className="flex flex-col items-center justify-center gap-4 rounded-xl p-4 text-center">
                <Typography as="code">
                  You can refresh the page by pressing F5,
                </Typography>
                <Typography as="code">
                  or it will automatically refresh in 8 seconds
                </Typography>
                <Typography as="code">
                  Alternatively, you can clear your local database.
                </Typography>

                <Loader className="my-6" />

                <Button variant={"warningOutilne"} onClick={handleClick}>
                  Reset Database
                </Button>
              </div>
            </>
          ) : (
            <Loader />
          )}
        </div>
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

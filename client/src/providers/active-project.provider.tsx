"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { type RxDocument } from "rxdb";
import { useRxData } from "rxdb-hooks";
import Loader from "~/components/loader";
import { type ActiveProject } from "~/lib/db/types";

const ActiveProjectContext = React.createContext<
  RxDocument<ActiveProject> | undefined
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
  const router = useRouter();
  const { result, isFetching } = useRxData<ActiveProject>(
    "activeProject",
    (collection) => collection.findOne(),
  );

  useEffect(() => {
    if (isFetching) return;
    if (pathname === "/") {
      if (!!result[0]?.metadataId) {
        router.push("/metadata-structure");
      }
    } else {
      if (!result[0]) {
        router.push("/");
      }
    }
  }, [pathname, result, router, isFetching]);

  if (isFetching)
    return (
      <main className="container flex flex-wrap place-content-center pt-32">
        <Loader />
      </main>
    );

  if (result[0])
    return (
      <ActiveProjectContext.Provider value={result[0]}>
        {children}
      </ActiveProjectContext.Provider>
    );
  else return children;
};

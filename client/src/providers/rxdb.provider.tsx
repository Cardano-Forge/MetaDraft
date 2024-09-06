"use client";

import React from "react";
import { type RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import { initialize } from "~/lib/db/initialize";

export const RxdbProvider = (props: { children: React.ReactNode }) => {
  const [db, setDb] = React.useState<RxDatabase | undefined>(undefined);

  React.useEffect(() => {
    // RxDB instantiation can be asynchronous
    initialize()
      .then(setDb)
      .catch(() => {
        //ignore
      });
    return () => {
      void db?.remove();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider db={db} {...props} />;
};

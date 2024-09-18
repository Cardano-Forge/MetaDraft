"use client";

import React, { useState, useEffect } from "react";
import { type RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import { initialize } from "~/lib/db/initialize";
import { type MyDatabase } from "~/lib/types";

export const RxdbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<RxDatabase<MyDatabase> | undefined>(undefined);

  useEffect(() => {
    initialize().then(setDb).catch(console.error);

    return () => {
      void db?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Provider db={db}>{children}</Provider>;
};

// DbContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { type RxDatabase } from "rxdb";
import { Provider } from "rxdb-hooks";
import { initialize } from "~/lib/db/initialize"; // Your initialization function
import { type MyDatabase } from "~/lib/types";

interface DbContextType {
  db: RxDatabase<MyDatabase> | undefined;
  reinitializeRxDB: () => Promise<void>;
}

const DbContext = createContext<DbContextType | undefined>(undefined);

export const RxdbProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [db, setDb] = useState<RxDatabase<MyDatabase> | undefined>(undefined);

  // Function to reinitialize the database
  const reinitializeRxDB = async () => {
    if (db) {
      await db.remove(); // Remove the existing database
    }
    const newDb = await initialize(); // Create a new instance of the database
    setDb(newDb); // Update the state with the new database
  };

  useEffect(() => {
    // Initialize the database on component mount
    reinitializeRxDB().catch(console.error);

    return () => {
      // Clean up database on component unmount
      void db?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <DbContext.Provider value={{ db, reinitializeRxDB }}>
      <Provider db={db}>{children}</Provider>
    </DbContext.Provider>
  );
};

export const useRxDBContext = () => {
  const context = useContext(DbContext);
  if (context === undefined) {
    throw new Error("useDbContext must be used within a DbProvider");
  }
  return context;
};

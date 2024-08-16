import { createRxDatabase, removeRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
const name = "metadraft";
const storage = getRxStorageDexie();
export const initialize = async () => {
  // create RxDB
  const db = await createRxDatabase({
    name,
    storage,
  });
  await db.addCollections({
    metadata: {
      schema: {
        title: "metadata",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          data: {
            type: "object",
          },
        },
      },
    },
    activeProject: {
      schema: {
        title: "activeProject",
        version: 0,
        type: "object",
        primaryKey: "id",
        properties: {
          id: {
            type: "string",
            maxLength: 100,
          },
          metadataId: {
            type: "string",
            maxLength: 100,
          },
        },
      },
    },
  });
  return db;
};
export const wipe = async () => {
  await removeRxDatabase(name, storage);
};

import { createRxDatabase } from "rxdb";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
export const initialize = async () => {
  // create RxDB
  const db = await createRxDatabase({
    name: "metadraft",
    storage: getRxStorageDexie(),
  });

  await db.addCollections({
    metadata: metadataSchema,
    activeProject: activeProjectSchema,
    validations: validationsSchema,
    project: projectSchema,
  });

  return db;
};

/**
 * Schema
 */

const metadataSchema = {
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
};

const activeProjectSchema = {
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
};

const validationsSchema = {
  schema: {
    title: "validations",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
      validations: {
        type: "object",
      },
    },
  },
};

const projectSchema = {
  schema: {
    title: "project",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 100,
      },
      name: {
        type: "string",
      },
      nfts: {
        type: "number",
        minimum: 0,
      },
      errorsDetected: {
        type: "number",
        minimum: 0,
      },
      errorsFlagged: {
        type: "number",
        minimum: 0,
      },
      valids: {
        type: "number",
        minimum: 0,
      },
    },
  },
};

import { createRxDatabase, addRxPlugin } from "rxdb";
import { RxDBJsonDumpPlugin } from "rxdb/plugins/json-dump";
import { RxDBMigrationSchemaPlugin } from "rxdb/plugins/migration-schema";
import { RxDBQueryBuilderPlugin } from "rxdb/plugins/query-builder";
import { getRxStorageDexie } from "rxdb/plugins/storage-dexie";
import { observeNewCollections } from "rxdb-hooks";

import type { MyDatabase } from "~/lib/types";

addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(observeNewCollections);
addRxPlugin(RxDBJsonDumpPlugin);
addRxPlugin(RxDBMigrationSchemaPlugin);

export const initialize = async () => {
  // create RxDB
  const db = await createRxDatabase<MyDatabase>({
    name: "metadraft",
    storage: getRxStorageDexie(),
    ignoreDuplicate: true,
  });

  await db.addCollections({
    metadata: metadataSchema,
    metadataSchema: metadataZodSchema,
    validations: validationsSchema,
    project: projectSchema,
    rules: rulesSchema,
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
        maxLength: 64,
      },
      assetName: {
        type: "string",
        maxLength: 64,
      },
      metadata: {
        type: "object",
      },
      status: {
        type: "string",
      },
    },
    required: ["id", "assetName"],
    indexes: ["assetName", ["id", "assetName"]],
  },
  migrationStrategies: {
    // [Example, how to migrate when we change the schema]
    // 1 means, this transforms data from version 0 to version 1
    // (Don't forget to change version ^ )
    // 1: function (oldDoc: MetadataCollection & { bob: string }) {
    //   oldDoc.bob = "Robert is awesome"; // set default value
    //   return oldDoc;
  },
};

const metadataZodSchema = {
  schema: {
    title: "metadataSchema",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 64,
      },
      schema: {
        type: "object",
      },
    },
    required: ["id"],
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
        maxLength: 64,
      },
      assetName: {
        type: "string",
        maxLength: 64,
      },
      validations: {
        type: "object",
      },
    },
    required: ["id", "assetName"],
    indexes: ["assetName", ["id", "assetName"]],
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
        maxLength: 64,
      },
      name: {
        type: "string",
        maxLength: 64,
      },
      nfts: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      unchecked: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      errorsDetected: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      errorsFlagged: {
        type: "number",
        minimum: 0,
        default: 0,
      },
      valids: {
        type: "number",
        minimum: 0,
        default: 0,
      },
    },
    required: ["id", "name"],
  },
};

const rulesSchema = {
  schema: {
    title: "rules",
    version: 0,
    type: "object",
    primaryKey: "id",
    properties: {
      id: {
        type: "string",
        maxLength: 64,
      },
      rules: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["id"],
  },
};

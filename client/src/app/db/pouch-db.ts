import PouchDB from "pouchdb";

export type MetadataDB = {
  hash?: string;
  metadata?: object;
  results?: object;
};

const metadataDB = new PouchDB<MetadataDB>("metadata");
export default metadataDB;

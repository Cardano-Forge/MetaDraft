import { formatError, formatSuccess } from "./utils";
import db, { type MetadataDB } from "./pouch-db";

/**
 *
 * @param hash
 * @returns
 */
export const get = async (hash: string) => {
  try {
    const doc = await db.get(hash);
    return formatSuccess(doc);
  } catch (err) {
    return formatError(`No data found with : ${hash}`);
  }
};

/**
 *
 * @param hash
 * @param key
 * @param data
 * @returns
 */
export const upsert = async <T>(
  hash: string,
  key: keyof MetadataDB,
  data: T,
) => {
  try {
    const doc = await get(hash);
    // update item
    await db.put({
      _id: hash,
      _rev: doc.data ? doc.data._rev : undefined,
      [key]: data,
    });
    await setActiveProject(hash);
  } catch (e) {
    return formatError(
      (e as Error).message ?? `Something went wrong while upsert: ${hash}`,
    );
  }

  return await get(hash);
};

/**
 *
 * @param hash
 */
export const setActiveProject = async (hash: string) => {
  const doc = await get("activeProject");
  try {
    await db.put({
      _id: "activeProject",
      _rev: doc.data ? doc.data._rev : undefined,
      hash: hash,
    });
  } catch (e) {
    console.error(e);
  }
};

export const clearActiveProject = async () => {
  const doc = await get("activeProject");
  if (doc.data) {
    try {
      await db.remove("activeProject", doc.data._rev);
    } catch (e) {
      console.error(e);
    }
  }
};

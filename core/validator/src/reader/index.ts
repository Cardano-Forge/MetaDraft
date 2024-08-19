import type { DataRead, IReader } from "../utils/types.ts";

/**
 * Represents an abstract base class for data readers.
 *
 * @module Reader
 * @class BaseReader
 * @abstract
 */
export abstract class BaseReader implements IReader {
  /**
   * The loaded data. This property will be set by the {@link load} method.
   */
  data: DataRead[] | null;

  constructor() {
    this.data = null;
  }

  /**
   * Loads data from a specified path or uses provided data.
   *
   * @param {string} _pathOrData - The file path or data to load.
   * @return {DataRead[]} The loaded data.
   */
  Load(_pathOrData: string): DataRead[] {
    throw new Error("Method not implemented.");
  }
  /**
   * Reads and returns the data.
   *
   * @return {DataRead[] | null} The read data.
   */
  Read(): DataRead[] | null {
    throw new Error("Method not implemented.");
  }
}

import { DataRead, IReader } from "../utils/types.ts";

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
  data: any;

  /**
   * Loads data from a specified path or uses provided data.
   *
   * @param {string | PromiseLike<string>} _pathOrData - The file path or data to load.
   * @return {Promise<any> | any} The loaded data.
   */
  Load(_pathOrData: string): Promise<any> | any {
    throw new Error("Method not implemented.");
  }
  /**
   * Reads and returns the data.
   *
   * @return {Promise<DataRead[]> | DataRead[]} The read data.
   */
  Read(): Promise<DataRead[]> | DataRead[] {
    throw new Error("Method not implemented.");
  }
}

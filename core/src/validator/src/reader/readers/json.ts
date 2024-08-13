import { readFileSync } from "node:fs";

import { DataRead } from "../../utils/types.ts";
import { BaseReader } from "../index.ts";
import { isValidPath } from "../../utils/file.ts";

/**
 * A reader implementation for JSON data.
 *
 * @extends {BaseReader}
 */
export class JsonReader extends BaseReader {
  constructor() {
    super();
    this.data = [];
  }

  /**
   * Loads JSON data from a specified path or uses provided JSON data string.
   *
   * @param {string | PromiseLike<string>} pathOrData - The file path containing JSON data or the JSON data as a string.
   * @return {object} The loaded JSON data as an object.
   */
  Load(pathOrData: string): object {
    if (isValidPath(pathOrData)) {
      this.data = JSON.parse(readFileSync(pathOrData, "utf8"));
    } else {
      this.data = JSON.parse(pathOrData);
    }

    return this.data;
  }

  /**
   * Reads and returns the loaded JSON data as an array of {@link DataRead} objects.
   *
   * @return {Promise<DataRead[]>} The read JSON data.
   */
  async Read(): Promise<DataRead[]> {
    return this.data;
  }
}

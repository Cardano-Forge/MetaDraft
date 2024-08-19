import { readFileSync } from "node:fs";

import type { DataRead } from "../../utils/types.ts";
import { BaseReader } from "../index.ts";
import { isValidPath } from "../../utils/file.ts";

/**
 * A reader implementation for JSON data.
 *
 * @module Reader
 * @class JsonReader
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
   * @param {string} pathOrData - The file path containing JSON data or the JSON data as a string.
   * @return {DataRead[]} The loaded JSON data as an object.
   */
  Load(pathOrData: string): DataRead[] {
    if (isValidPath(pathOrData)) {
      this.data = JSON.parse(readFileSync(pathOrData, "utf8"));
    } else {
      this.data = JSON.parse(pathOrData);
    }

    return this.data as DataRead[];
  }

  /**
   * Reads and returns the loaded JSON data as an array of {@link DataRead} objects.
   *
   * @return {DataRead[] | null} The read JSON data.
   */
  Read(): DataRead[] | null {
    return this.data;
  }
}

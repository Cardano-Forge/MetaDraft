import csvToJson from "convert-csv-to-json";

import type { CsvOptions, DataRead } from "../../utils/types.ts";
import { BaseReader } from "../index.ts";
import { isValidPath } from "../../utils/file.ts";

/**
 * A reader implementation for CSV data using {@link https://www.npmjs.com/package/convert-csv-to-json convert-csv-to-json} library.
 *
 * @module Reader
 * @class CsvReader
 * @extends {BaseReader}
 */
export class CsvReader extends BaseReader {
  /**
   * The configuration options for parsing CSV data.
   *
   * @type {{ delimiter?: string, valueByType?: boolean, subArray?: [string, string], quotedField?: boolean }}
   */
  private options: CsvOptions = {
    delimiter: ",",
    valueByType: true,
    subArray: ["*", ","],
    quotedField: true,
  };

  /**
   * Creates a new instance of {@link CsvReader} with the specified options.
   *
   * @param {CsvOptions} [options] - The configuration options for parsing CSV data. If no options are provided, default values will be used.
   */
  constructor(options?: CsvOptions) {
    super();
    this.data = null;

    this.options = {
      ...this.options,
      ...options,
    };
  }

  /**
   * Loads CSV data from a specified path or uses provided CSV data string.
   *
   * @param {string} pathOrData - The file path containing CSV data or the CSV data as a string.
   * @return {DataRead[]} An array of objects representing the parsed CSV data.
   */
  override Load(pathOrData: string): DataRead[] {
    const reader = csvToJson
      .formatValueByType(this.options.valueByType)
      .fieldDelimiter(this.options.delimiter)
      .parseSubArray(...(this.options.subArray as [string, string]))
      .supportQuotedField(this.options.quotedField);

    if (isValidPath(pathOrData)) {
      this.data = reader.getJsonFromCsv(pathOrData);
    } else {
      this.data = reader.csvStringToJson(pathOrData);
    }

    return this.data as DataRead[];
  }

  /**
   * Reads and returns the loaded CSV data as an array of {@link DataRead} objects.
   *
   * @return {DataRead[] | null} The read CSV data.
   */
  override Read(): DataRead[] | null {
    return this.data;
  }
}

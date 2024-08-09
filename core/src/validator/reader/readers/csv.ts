import csvToJson from "npm:convert-csv-to-json";

import { DataRead } from "../../utils/types.ts";
import { BaseReader } from "../index.ts";
import { isValidPath } from "../../utils/file.ts";

export class CsvReader extends BaseReader {
  private options = {
    delimiter: ",",
    valueByType: true,
    subArray: ["*", ","],
    quotedField: true,
  };
  constructor(
    delimiter = ",",
    valueByType = true,
    subArray = ["*", ","],
    quotedField = true,
  ) {
    super();
    this.data = null;

    this.options.delimiter = delimiter;
    this.options.valueByType = valueByType;
    this.options.subArray = subArray;
    this.options.quotedField = quotedField;
  }

  Load(pathOrData: string): object {
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

    return this.data;
  }

  async Read(): Promise<DataRead[]> {
    return this.data;
  }
}

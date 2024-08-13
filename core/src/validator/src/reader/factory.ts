import { CsvReader } from "./readers/csv.ts";
import { JsonReader } from "./readers/json.ts";
import { CsvOptions, IReader } from "../utils/types.ts";

/**
 * A factory class responsible for creating data readers based on the specified type.
 */
export class ReaderFactory {
  /**
   * Creates a new reader instance based on the given type and options.
   *
   * @param {("csv"|"json")} type - The type of the reader to create.
   * @param {CsvOptions} [options] - The configuration options for CSV readers. Not applicable to JSON readers.
   * @return {IReader} A new instance of the specified reader type.
   *
   * @throws Will throw an error if an unknown reader type is provided.
   */
  static createReader(type: "csv" | "json", options?: CsvOptions): IReader {
    if (type === "csv") {
      return new CsvReader(options);
    } else if (type === "json") {
      return new JsonReader();
    } else {
      throw new Error(`Unknown Reader type, received: ${type}`);
    }
  }
}

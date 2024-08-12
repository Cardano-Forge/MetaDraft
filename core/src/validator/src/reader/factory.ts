import { CsvReader } from "./readers/csv.ts";
import { JsonReader } from "./readers/json.ts";
import { CsvOptions, IReader } from "../utils/types.ts";

export class ReaderFactory {
  static createReader(type: "csv" | "json", options?: CsvOptions): IReader {
    if (type === "csv") {
      return new CsvReader(options);
    } else if (type === "json") {
      return new JsonReader();
    } else {
      throw new Error("Unknown Reader type");
    }
  }
}

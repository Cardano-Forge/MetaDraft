import { join, normalize } from "node:path";
import { CsvReader } from "../../src/reader/readers/csv.ts";

const csvReader = new CsvReader();
csvReader.Load(
  normalize(join(Deno.cwd(), "__tests__", "payloads", "fort-gotten.csv")),
);

const data = csvReader.Read();

console.log("DATA TO VALIDATE", data);

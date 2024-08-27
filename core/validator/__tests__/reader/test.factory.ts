import { assertInstanceOf } from "@std/assert";
import type { CsvOptions } from "../../src/utils/types.ts";
import { ReaderFactory } from "../../src/reader/factory.ts";
import { CsvReader } from "../../src/reader/readers/csv.ts";
import { JsonReader } from "../../src/reader/readers/json.ts";

Deno.test("Reader factory", () => {
  const readerCsv = ReaderFactory.createReader("csv");
  const readerCsvWithOptions = ReaderFactory.createReader("csv", {
    delimiter: ";",
  } as CsvOptions);
  const readerJson = ReaderFactory.createReader("json");

  assertInstanceOf(readerCsv, CsvReader);
  assertInstanceOf(readerCsvWithOptions, CsvReader);
  assertInstanceOf(readerJson, JsonReader);
});

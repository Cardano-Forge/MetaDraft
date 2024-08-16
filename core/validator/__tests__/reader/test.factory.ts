import { CsvOptions } from "../../src/utils/types.ts";
import { ReaderFactory } from "../../src/reader/factory.ts";

const readerCsv = ReaderFactory.createReader("csv");
const readerCsvWithOptions = ReaderFactory.createReader("csv", {
  delimiter: ";",
} as CsvOptions);
const readerJson = ReaderFactory.createReader("json");

console.log(readerCsv);
console.log(readerCsvWithOptions);
console.log(readerJson);

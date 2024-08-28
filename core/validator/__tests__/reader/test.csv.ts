import { assertEquals } from "@std/assert";
import { join, normalize } from "node:path";
import { CsvReader } from "../../src/reader/readers/csv.ts";

Deno.test("csv reader", () => {
  const csvReader = new CsvReader();
  csvReader.Load(
    normalize(join(Deno.cwd(), "__tests__", "payloads", "fort-gotten.csv")),
  );

  const data = csvReader.Read();

  assertEquals(data, [
    {
      Accessory: "None",
      Backpack: "None",
      Body: "Icy Lavender",
      Camp: "BURUKA",
      Clothing: "None",
      Episode: "Beyond The Forest",
      "FGI__-": "e03c9389d69-202111002110",
      Hat: "None",
      KidNumber: 3195,
      KidzJournal__Achievement: "None",
      KidzJournal__Customizations: 1,
      Mask: "None",
      Necklace: "None",
      Region: "Mountains",
      Role: "Scout",
      Staff: "None",
      Straps: "None",
      Website: "https://fort-gotten.com",
      Wheelchair: "None",
      files__mediaType: "image/png",
      files__name: "Fort Gotten Ep02 Kid #3195",
      files__src: "ipfs://QmWhS125ua7fV3JNy4mDb5HxeuJxQyd75Yokn67jmiJqxR",
      image: "ipfs://QmXTstzWgt3vs135V8J63sFVGDJnyBaEmFtFq23Xro8uPJ",
      mediaType: "image/png",
      name: "Fort Gotten Ep02 Kid #3195",
    },
  ]);
});

import { join, normalize } from "node:path";
import { JsonReader } from "../../reader/readers/json.ts";

const jsonReader = new JsonReader();
jsonReader.Load(
  normalize(join(Deno.cwd(), "__tests__", "payloads", "fort-gotten.json")),
);

const data = jsonReader.Read();

console.log("DATA TO VALIDATE", data);

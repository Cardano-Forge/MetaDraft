import { readFileSync } from "node:fs";

import { DataRead } from "../../utils/types.ts";
import { BaseReader } from "../index.ts";
import { isValidPath } from "../../utils/file.ts";

export class JsonReader extends BaseReader {
  constructor() {
    super();
    this.data = null;
  }

  Load(pathOrData: string): object {
    if (isValidPath(pathOrData)) {
      this.data = JSON.parse(readFileSync(pathOrData, "utf8"));
    } else {
      this.data = JSON.parse(pathOrData);
    }

    return this.data;
  }

  async Read(): Promise<DataRead[]> {
    return this.data;
  }
}

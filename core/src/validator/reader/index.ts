import { DataRead, IReader } from "../utils/types.ts";

export abstract class BaseReader implements IReader {
  data: any;

  Load(_pathOrData: string): Promise<any> | any {
    throw new Error("Method not implemented.");
  }

  Read(): Promise<DataRead[]> | DataRead[] {
    throw new Error("Method not implemented.");
  }
}

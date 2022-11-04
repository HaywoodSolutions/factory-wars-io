import { ProducerStructure } from "../types";
import { DB } from "./DB";

export class Structures extends DB<ProducerStructure> {
  constructor() {
    super("structures");
  }

  getStructures(): Promise<Record<string, ProducerStructure>> {
    return super.getWhere();
  }
}

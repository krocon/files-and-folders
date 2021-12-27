import { TabMetaData } from "./tab-meta.data";
import { FindData } from "@fnf/fnf-data";

export class TabData {

  public history: string[] = [];
  public readonly meta: TabMetaData = new TabMetaData();
  public findData: FindData | undefined;

  constructor(
    public path: string
  ) {
  }
}

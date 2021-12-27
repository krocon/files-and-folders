import { FileItemIf } from "@fnf/fnf-data";

export class TabMetaData {

  constructor(
    public filterActive: boolean = false,
    public filterText: string = "",
    public selected: boolean = false,
    public selectedFileItems: FileItemIf[] = [],
    public focusRow = 0
  ) {
  }
}

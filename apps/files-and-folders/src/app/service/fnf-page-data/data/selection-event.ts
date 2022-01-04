import {FileItemIf} from "@fnf/fnf-data";
import {SelectionLabelData} from "./selection-label.data";

export class SelectionEvent {

  constructor(
    public selectionLabelData: SelectionLabelData = new SelectionLabelData(),
    public fileItems: FileItemIf[] = []
  ) {
  }
}

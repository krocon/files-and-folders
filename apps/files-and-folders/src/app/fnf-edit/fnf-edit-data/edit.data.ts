import {EditFileData} from "./edit-file.data";

export class EditData {

  constructor(
    public selectedIndex: 0,
    public files: EditFileData[] = []
  ) {
  }
}

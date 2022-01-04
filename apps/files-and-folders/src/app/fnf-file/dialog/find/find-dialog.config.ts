import {MatDialogConfig} from "@angular/material/dialog";
import {FindDialogData} from "@fnf/fnf-data";

export class FindDialogConfig extends MatDialogConfig {

  public data: FindDialogData = new FindDialogData("", "**/*.");

  constructor(data: FindDialogData) {
    super();
    this.data = data;
    this.minHeight = 400;
    this.minWidth = "400px";
  }
}

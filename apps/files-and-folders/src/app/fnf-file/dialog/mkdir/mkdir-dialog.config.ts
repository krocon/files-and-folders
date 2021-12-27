import { MatDialogConfig } from "@angular/material/dialog";
import { MkdirDialogData } from "./mkdir-dialog.data";

export class MkdirDialogConfig extends MatDialogConfig {

  public data: MkdirDialogData = new MkdirDialogData();

}

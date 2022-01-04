import {Injectable} from "@angular/core";
import {MkdirDialogData} from "./mkdir-dialog.data";
import {MkdirDialogComponent} from "./mkdir-dialog.component";
import {takeWhile} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {MkdirDialogConfig} from "./mkdir-dialog.config";
import {FileItemIf} from "@fnf/fnf-data";

@Injectable()
export class MkdirDialogService {


  constructor(
    public readonly dialog: MatDialog
  ) {
  }


  public open(data: MkdirDialogData, cb: (b: FileItemIf | undefined) => void) {
    let alive = true;

    const config = new MkdirDialogConfig();
    config.data = data;

    return this.dialog
      .open<MkdirDialogComponent, MkdirDialogData, FileItemIf | undefined>(MkdirDialogComponent, config)
      .afterClosed()
      .pipe(takeWhile(() => alive))
      .subscribe(fileItem => {
        alive = false;
        cb(fileItem);
      });
  }

}

import {Component, Inject, OnDestroy, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CopyOrMoveDialogData} from "./copy-or-move-dialog.data";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FileItem, WalkData} from "@fnf/fnf-data";
import {CommandService} from "../../../service/fnf-command/command.service";
import {TableSelectionService} from "../../../service/fnf-table-selection/table-selection.service";
import {WalkSocketService} from "../../../service/walk/walk.socketio.service";
import {takeWhile} from "rxjs/operators";
import {FileOperation} from "./file-operation";

@Component({
  selector: "fnf-copy-or-move-dialog",
  templateUrl: "./copy-or-move-dialog.component.html",
  styleUrls: ["./copy-or-move-dialog.component.scss"]
})
export class CopyOrMoveDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  error = "";
  errorMesasage = "";
  walkData = new WalkData(0, 0, 0, false);

  title = "Copy";
  source = "";
  sourceTooltip = "";
  focusOnTarget = false;
  deleteMode = false;

  private alive = true;

  constructor(
    public dialogRef: MatDialogRef<CopyOrMoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CopyOrMoveDialogData,
    private readonly formBuilder: FormBuilder,
    private readonly commandService: CommandService,
    private readonly selectionService: TableSelectionService,
    private readonly walkSocketService: WalkSocketService
  ) {
    this.title = this.getTitleByKey(data?.fileOperation);
    this.deleteMode = data?.fileOperation === "delete";

    if (data.source.length > 1) {
      this.source = data.source.length + " items";
    } else {
      this.source = data.source[0];
    }
    this.sourceTooltip = data.source.join("\n");

    this.formGroup = this.formBuilder.group(
      this.deleteMode ? {} :
        {
          // source: new FormControl(this.source, []),
          target: new FormControl(data.target, [Validators.required, Validators.minLength(1)])
        });
    dialogRef
      .afterOpened()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.focusOnTarget = !this.deleteMode;
      });
  }

  get hasError(): boolean {
    return false;
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  ngOnInit(): void {
    this.alive = true;
    this.walkSocketService.walkDir(this.data.source, (walkData: WalkData) => this.walkData = walkData);

  }

  onOkClicked() {
    const fileItem = new FileItem(this.data.target, this.formGroup.getRawValue().name, "");
    fileItem.isDir = true;
    this.dialogRef.close(fileItem);
  }

  onCancelClicked() {
    this.dialogRef.close(undefined);
  }

  private getTitleByKey(key: FileOperation): string {
    const m = {
      copy: "Copy",
      move: "Move",
      delete: "Delete"
    };
    return m[key];
  }

}

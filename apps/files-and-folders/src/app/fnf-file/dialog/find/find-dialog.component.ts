import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { takeWhile } from "rxjs/operators";
import { FormGroupTyped } from "../../../common/form-group-typed";
import { FindDialogData } from "@fnf/fnf-data";

@Component({
  selector: "fnf-find-dialog",
  templateUrl: "./find-dialog.component.html",
  styleUrls: ["./find-dialog.component.scss"]
})
export class FindDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroupTyped<Partial<FindDialogData>>;
  error = "";
  autofocus = false;
  lastPatterns = [
    '**/*.(cbr|cbz)',
    '**/*.jsp',
    '**/*.epub',
    '**/*.(jpg|jpeg|png|gif|bmp)'
  ];
  private alive = true;

  constructor(
    public dialogRef: MatDialogRef<FindDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FindDialogData
  ) {
    this.formGroup = new FormGroupTyped<Partial<FindDialogData>>(
      {
        folders: new FormControl(),
        folder: new FormControl(this.data.folder, [
          Validators.required, Validators.minLength(1)
        ]),
        pattern: new FormControl(this.data.pattern, [
          Validators.required, Validators.minLength(1)
        ]),
        newtab: new FormControl(this.data.newtab, [])
      });
    this.formGroup.patchValue(data);

    dialogRef
      .afterOpened()
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.autofocus = true;
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
  }

  onOkClicked() {
    this.dialogRef.close(this.formGroup.getRawValue());
  }

  onCancelClicked() {
    this.dialogRef.close(undefined);
  }


  setPattern(p: string) {
    this.data.pattern = p;
    this.formGroup.patchValue(this.data);
  }
}

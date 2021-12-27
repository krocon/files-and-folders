import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MkdirDialogData } from "./mkdir-dialog.data";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { FileItem } from "@fnf/fnf-data";

@Component({
  selector: "fnf-mkdir-dialog",
  templateUrl: "./mkdir-dialog.component.html",
  styleUrls: ["./mkdir-dialog.component.scss"]
})
export class MkdirDialogComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  buttonSpinnerVisible = false;

  error = "";
  errorMesasage = "";

  private alive = true;

  constructor(
    public dialogRef: MatDialogRef<MkdirDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MkdirDialogData,
    private readonly formBuilder: FormBuilder
  ) {
    this.formGroup = this.formBuilder.group({
      name: new FormControl(data.name, [Validators.required, Validators.minLength(1)])
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
    const fileItem = new FileItem(this.data.targetDir, this.formGroup.getRawValue().name, "");
    fileItem.isDir = true;
    this.dialogRef.close(fileItem);
  }

  onCancelClicked() {
    this.dialogRef.close(undefined);
  }

}

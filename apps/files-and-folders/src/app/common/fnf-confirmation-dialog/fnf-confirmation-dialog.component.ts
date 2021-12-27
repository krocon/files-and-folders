import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ConfirmationData } from "./data/confirmation.data";
import { ButtonData } from "./data/button.data";

@Component({
  selector: "fnf-confirmation-dialog",
  templateUrl: "./fnf-confirmation-dialog.component.html",
  styleUrls: ["./fnf-confirmation-dialog.component.scss"]
})
export class FnfConfirmationDialogComponent {
  public vertical = false;

  constructor(
    public dialogRef: MatDialogRef<FnfConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationData
  ) {
    this.vertical = data.vertical;
  }

  onButtonClicked(btn: ButtonData) {
    this.dialogRef.close(btn.key);
  }

  onCloseClicked() {
    this.dialogRef.close("CANCEL");
  }
}

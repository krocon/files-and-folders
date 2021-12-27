import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MkdirDialogComponent } from "./mkdir-dialog.component";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { ReactiveFormsModule } from "@angular/forms";
import { FnfAutofocusModule } from "../../../common/fnf-autofocus/fnf-autofocus.module";
import { MatInputModule } from "@angular/material/input";
import { MkdirDialogService } from "./mkdir-dialog.service";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    MkdirDialogComponent
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FnfAutofocusModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [
    MkdirDialogService
  ],
  entryComponents: [
    MkdirDialogComponent
  ]
})
export class MkdirDialogModule {

}

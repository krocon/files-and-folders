import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FindDialogComponent} from "./find-dialog.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FnfAutofocusModule} from "../../../common/fnf-autofocus/fnf-autofocus.module";
import {MatInputModule} from "@angular/material/input";
import {FindDialogService} from "./find-dialog.service";
import {MatDialogModule} from "@angular/material/dialog";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatMenuModule} from "@angular/material/menu";


@NgModule({
  declarations: [
    FindDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    FnfAutofocusModule,
    MatInputModule,
    MatDialogModule,
    MatTooltipModule,
    MatMenuModule
  ],
  providers: [
    FindDialogService
  ],
  entryComponents: [
    FindDialogComponent
  ]
})
export class FindDialogModule {

}

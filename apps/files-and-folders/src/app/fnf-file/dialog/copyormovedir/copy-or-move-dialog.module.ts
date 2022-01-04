import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {CopyOrMoveDialogComponent} from "./copy-or-move-dialog.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ReactiveFormsModule} from "@angular/forms";
import {FnfAutofocusModule} from "../../../common/fnf-autofocus/fnf-autofocus.module";
import {MatInputModule} from "@angular/material/input";
import {CopyOrMoveDialogService} from "./copy-or-move-dialog.service";
import {MatDialogModule} from "@angular/material/dialog";
import {WalkModule} from "../../../service/walk/walk.module";
import {FnfFileSizeModule} from "../../../common/fnf-file-size/fnf-file-size.module";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    CopyOrMoveDialogComponent
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
    MatDialogModule,
    WalkModule,
    FnfFileSizeModule,
    MatTooltipModule
  ],
  providers: [
    CopyOrMoveDialogService
  ],
  entryComponents: [
    CopyOrMoveDialogComponent
  ]
})
export class CopyOrMoveDialogModule {

}

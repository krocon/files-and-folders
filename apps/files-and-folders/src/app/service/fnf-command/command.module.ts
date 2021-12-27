import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LookAndFeelModule } from "../fnf-look-and-feel/look-and-feel.module";
import { MkdirDialogModule } from "../../fnf-file/dialog/mkdir/mkdir-dialog.module";
import { EditDataModule } from "../../fnf-edit/fnf-edit-data/edit-data.module";
import { CopyOrMoveDialogModule } from "../../fnf-file/dialog/copyormovedir/copy-or-move-dialog.module";
import { CommandService } from "./command.service";
import { FindDialogModule } from "../../fnf-file/dialog/find/find-dialog.module";

@NgModule({
  imports: [
    CommonModule,
    LookAndFeelModule,
    MkdirDialogModule,
    EditDataModule,
    CopyOrMoveDialogModule,
    FindDialogModule
  ],
  providers: [
    CommandService
  ]
})
export class CommandModule {
}

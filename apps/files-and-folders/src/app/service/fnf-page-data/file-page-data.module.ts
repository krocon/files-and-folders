import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilePageDataService} from "./file-page-data.service";
import {LatestDataService} from "./service/latest-data.service";
import {FavDataService} from "./service/fav-data.service";
import {LookAndFeelModule} from "../fnf-look-and-feel/look-and-feel.module";
import {PanelSelectionService} from "./service/panel-selection.service";
import {EditDataModule} from "../../fnf-edit/fnf-edit-data/edit-data.module";
import {MkdirDialogModule} from "../../fnf-file/dialog/mkdir/mkdir-dialog.module";
import {FileActionService} from "./service/file-action.service";
import {CopyOrMoveDialogModule} from "../../fnf-file/dialog/copyormovedir/copy-or-move-dialog.module";


@NgModule({
  imports: [
    CommonModule,
    LookAndFeelModule,
    MkdirDialogModule,
    EditDataModule,
    CopyOrMoveDialogModule
  ],
  providers: [
    FilePageDataService,
    LatestDataService,
    FavDataService,
    PanelSelectionService,
    FileActionService
  ]
})
export class FilePageDataModule {
}

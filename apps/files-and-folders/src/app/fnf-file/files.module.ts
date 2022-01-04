import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FilesComponent} from "./files.component";
import {RouterModule} from "@angular/router";
import {ButtonPanelModule} from "./footer/fnf-button-panel/button-panel.module";
import {DirTableModule} from "./fnf-dir-table/dir-table.module";
import {DirTabsModule} from "./header/fnf-tabs/dir-tabs.module";
import {BreadCrumbModule} from "./header/fnf-breadcrumb/bread-crumb.module";
import {SysinfoModule} from "../service/fnf-sysinfo/sysinfo.module";
import {FavsAndLatestEventModule} from "./footer/fnf-file-menu/event/favs-and-latest-event.module";
import {FilePageDataModule} from "../service/fnf-page-data/file-page-data.module";
import {ActionModule} from "../service/fnf-action/action.module";
import {SummaryLabelModule} from "./footer/fnf-summary-label/summary-label.module";
import {CommandModule} from "../service/fnf-command/command.module";
import {FileSystemModule} from "../service/fnf-file-system/file-system.module";


@NgModule({
  declarations: [
    FilesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: FilesComponent
      }
    ]),
    ButtonPanelModule,
    DirTableModule,
    DirTabsModule,
    FilePageDataModule,
    FavsAndLatestEventModule,
    BreadCrumbModule,
    SysinfoModule,
    ActionModule,
    SummaryLabelModule,
    CommandModule,
    FileSystemModule
  ]
})
export class FilesModule {
}

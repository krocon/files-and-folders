import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DirTableComponent } from "./dir-table.component";
import { AgGridModule } from "ag-grid-angular";
import { HttpClientModule } from "@angular/common/http";
import { TableSelectionModule } from "../../service/fnf-table-selection/table-selection.module";
import { GridSelectionStoreService } from "./service/grid-selection-store.service";
import { GridSelectionCountService } from "./service/grid-selection-count.service";
import { WalkModule } from "../../service/walk/walk.module";
import { FileSystemModule } from "../../service/fnf-file-system/file-system.module";


@NgModule({
  declarations: [
    DirTableComponent
  ],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HttpClientModule,
    TableSelectionModule,
    WalkModule,
    FileSystemModule
  ],
  exports: [
    DirTableComponent
  ],
  providers: [
    GridSelectionStoreService,
    GridSelectionCountService
  ]
})
export class DirTableModule {
}

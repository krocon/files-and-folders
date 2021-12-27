import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TableSelectionService } from "./table-selection.service";


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    TableSelectionService
  ]
})
export class TableSelectionModule {
}

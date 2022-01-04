import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditDataService} from "./edit-data.service";
import {MemoryCacheModule} from "../../common/fnf-memory-cache/memory-cache.module";

@NgModule({
  imports: [
    CommonModule,
    MemoryCacheModule
  ],
  providers: [
    EditDataService
  ]
})
export class EditDataModule {
}

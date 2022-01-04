import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import {FindSocketService} from "./find.socketio.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  exports: [],
  providers: [
    FindSocketService
  ]
})
export class FindModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {AgGridModule} from "ag-grid-angular";
import {HttpClientModule} from "@angular/common/http";
import {WalkSocketService} from "./walk.socketio.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  exports: [],
  providers: [
    WalkSocketService
  ]
})
export class WalkModule {
}

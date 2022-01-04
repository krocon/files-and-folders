import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FavsAndLatestEventService} from "./favs-and-latest-event.service";


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FavsAndLatestEventService
  ]
})
export class FavsAndLatestEventModule {
}

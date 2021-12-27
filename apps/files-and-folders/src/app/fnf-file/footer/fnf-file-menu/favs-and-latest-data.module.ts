import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FavsAndLatestComponent } from "./favs-and-latest.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { FavsAndLatestEventModule } from "./event/favs-and-latest-event.module";


@NgModule({
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    FavsAndLatestEventModule
  ],
  declarations: [
    FavsAndLatestComponent
  ],
  exports: [
    FavsAndLatestComponent
  ],
  providers: []
})
export class FavbsAndLatestModule {
}

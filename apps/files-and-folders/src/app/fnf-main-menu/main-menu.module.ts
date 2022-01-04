import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {MainMenuComponent} from "./main-menu.component";
import {MatMenuModule} from "@angular/material/menu";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatDividerModule} from "@angular/material/divider";


@NgModule({
  declarations: [
    MainMenuComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatBadgeModule,
    MatDividerModule
  ],
  exports: [
    MainMenuComponent
  ],
  providers: []
})
export class MainMenuModule {
}

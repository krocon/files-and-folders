import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BreadCrumbComponent } from "./bread-crumb.component";
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatTooltipModule } from "@angular/material/tooltip";


@NgModule({
  declarations: [
    BreadCrumbComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule
  ],
  exports: [
    BreadCrumbComponent
  ],
  providers: []
})
export class BreadCrumbModule {
}

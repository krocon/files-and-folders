import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SummaryLabelComponent} from "./summary-label.component";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {FavbsAndLatestModule} from "../fnf-file-menu/favs-and-latest-data.module";


@NgModule({
  declarations: [
    SummaryLabelComponent
  ],
  imports: [
    CommonModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatTooltipModule,
    FavbsAndLatestModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule
  ],
  exports: [
    SummaryLabelComponent
  ],
  providers: []
})
export class SummaryLabelModule {
}

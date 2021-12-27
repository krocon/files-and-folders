import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CustomCssComponent } from "./custom-css.component";
import { RouterModule } from "@angular/router";
import { LookAndFeelModule } from "../service/fnf-look-and-feel/look-and-feel.module";
import { CssColorEditService } from "./service/css-color-edit.service";
import { AgGridModule } from "ag-grid-angular";
import { ColorPickerModule } from "ngx-color-picker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
  declarations: [
    CustomCssComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: CustomCssComponent
      }
    ]),
    LookAndFeelModule,
    AgGridModule,
    ColorPickerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatMenuModule
  ],
  providers: [
    CssColorEditService
  ]
})
export class CustomCssModule {
}

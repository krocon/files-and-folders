import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ButtonPanelComponent} from "./button-panel.component";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {ShortcutComponent} from "./shortcut.component";
import {MatDividerModule} from "@angular/material/divider";
import {TableSelectionModule} from "../../../service/fnf-table-selection/table-selection.module";


@NgModule({
  declarations: [
    ButtonPanelComponent,
    ShortcutComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    TableSelectionModule
  ],
  exports: [
    ButtonPanelComponent,
    ShortcutComponent
  ]
})
export class ButtonPanelModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {EditComponent} from "./edit.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {AceEditorModule} from "@postfinance/ngx-ace-editor-wrapper";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [
    EditComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: EditComponent
      },
      {
        path: ":idx",
        component: EditComponent
      }
    ]),
    MatButtonModule,
    AceEditorModule,
    MatIconModule
  ],
  providers: []
})
export class EditModule {
}

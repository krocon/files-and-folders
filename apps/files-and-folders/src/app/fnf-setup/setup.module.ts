import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {SetupComponent} from "./setup.component";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    SetupComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: SetupComponent
      }
    ]),
    MatButtonModule,
    MatIconModule
  ],
  providers: []
})
export class SetupModule {
}

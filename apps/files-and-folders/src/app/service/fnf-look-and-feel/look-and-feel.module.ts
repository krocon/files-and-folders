import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LookAndFeelService } from "./look-and-feel.service";


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    LookAndFeelService
  ]
})
export class LookAndFeelModule {
}

import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FnfFileSizePipe } from "./fnf-file-size.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FnfFileSizePipe
  ],
  exports: [
    FnfFileSizePipe
  ]
})
export class FnfFileSizeModule {
}

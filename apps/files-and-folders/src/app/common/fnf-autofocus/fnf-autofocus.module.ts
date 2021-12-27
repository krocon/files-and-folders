import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FnfAutofocusDirective } from "./fnf-autofocus.directive";

@NgModule({
  declarations: [FnfAutofocusDirective],
  imports: [CommonModule],
  exports: [FnfAutofocusDirective]
})
export class FnfAutofocusModule {
}

import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {ShortcutService} from "./shortcut.service";
import {ShortcutListenService} from "./shortcut-listen.service";


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    ShortcutService,
    ShortcutListenService
  ]
})
export class ShortcutModule {
}

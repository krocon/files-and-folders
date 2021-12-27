import { Component, Input } from "@angular/core";

@Component({
  selector: "fnf-shortcut",
  templateUrl: "./shortcut.component.html",
  styleUrls: ["./shortcut.component.scss"]
})
export class ShortcutComponent {

  @Input() keys: string[] = [];

}

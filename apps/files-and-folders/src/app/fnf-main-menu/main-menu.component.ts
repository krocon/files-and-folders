import {Component, OnDestroy, OnInit} from "@angular/core";
import {takeWhile} from "rxjs/operators";
import {EditData} from "../fnf-edit/fnf-edit-data/edit.data";
import {ShortcutService} from "../service/fnf-shortcut/shortcut.service";
import {EditDataService} from "../fnf-edit/fnf-edit-data/edit-data.service";


@Component({
  selector: "fnf-main-menu-fab",
  templateUrl: "./main-menu.component.html",
  styleUrls: ["./main-menu.component.scss"]
})
export class MainMenuComponent implements OnInit, OnDestroy {


  editData: EditData = new EditData(0, []);
  badge = "";
  private isAlive = true;

  constructor(
    private readonly shortcutService: ShortcutService,
    private readonly editDataService: EditDataService
  ) {

  }

  ngOnDestroy(): void {
    this.isAlive = false;
  }

  ngOnInit(): void {
    this.editDataService
      .valueChanges$
      .pipe(
        takeWhile(() => this.isAlive)
      )
      .subscribe(data => {
        this.editData = data;
        let changedCount = 0;
        for (const file of this.editData.files) {
          if (file.unsaved) {
            changedCount++;
          }
        }
        this.badge = (changedCount > 0) ? changedCount + "" : "";
      });
  }

  fixLabel(p: string): string | undefined {
    if (!p) {
      return "";
    }
    p = p
      .replace(/\\/g, "/")
      .replace(/\/\//g, "/");

    if (p === "/") {
      return "/";
    }

    if (p.length > 1 && p.endsWith("/")) {
      p = p.substr(0, p.length - 1);
    }
    return p
      .split("/")
      .pop();
  }

}

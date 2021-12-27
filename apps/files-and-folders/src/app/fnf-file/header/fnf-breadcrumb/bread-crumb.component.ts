import { Component, Input, Output } from "@angular/core";
import { Subject } from "rxjs";


@Component({
  selector: "fnf-bread-crumb",
  templateUrl: "./bread-crumb.component.html",
  styleUrls: ["./bread-crumb.component.scss"]
})
export class BreadCrumbComponent {

  @Output() pathClicked = new Subject<string>();
  @Output() toggleFavClicked = new Subject<string>();
  @Input() selected = false;
  @Input() favs: string[] = [];
  subs: string[] = [];
  favIconVisible = true;

  private _path = "";


  @Input()
  set path(value: string) {
    this._path = value;
    this.subs = value.split("/");
    this.favIconVisible = this.subs.length > 1;
  }

  get isFav() {
    return this.favs.indexOf(this._path) > -1;
  }

  onPathClicked(idx: number) {
    const p = this.subs.filter((v, i) => i <= idx).join("/");
    this.pathClicked.next(p);
  }

  onToggleFavClicked() {
    this.toggleFavClicked.next(this._path);
  }

  onRootClicked() {
    this.pathClicked.next(this.getRootFromPath(this._path));
  }

  private getRootFromPath(path: string): string {
    if (!path) {
      return "/";
    }
    if (path.length > 1 && path[1] === ":") {
      return path[0] + ":/";
    }
    return "/";
  }

}

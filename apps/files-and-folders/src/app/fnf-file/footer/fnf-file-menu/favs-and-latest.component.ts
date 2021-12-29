import {Component, Input} from "@angular/core";
import {FavsAndLatestEventService} from "./event/favs-and-latest-event.service";
import {FavsAndLatestEvent} from "./event/favs-and-latest-event";
import {PanelIndex} from "../../../service/fnf-page-data/data/panel-index";


@Component({
  selector: "fnf-fav-menu",
  templateUrl: "./favs-and-latest.component.html",
  styleUrls: ["./favs-and-latest.component.scss"]
})
export class FavsAndLatestComponent {

  @Input() panelIndex: PanelIndex = 0;
  @Input() winDrives: string[] = [];
  @Input() favs: string[] = [];
  @Input() latest: string[] = [];
  @Input() dockerRoot: string = '';

  private alive = true;

  constructor(
    private readonly favsAndLatestEventService: FavsAndLatestEventService
  ) {
  }


  onItemClicked(path: string) {
    this.favsAndLatestEventService.next(new FavsAndLatestEvent(this.panelIndex, path));
  }

}

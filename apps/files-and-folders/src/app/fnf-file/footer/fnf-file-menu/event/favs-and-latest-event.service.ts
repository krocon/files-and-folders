import { Injectable } from "@angular/core";
import { FavsAndLatestEvent } from "./favs-and-latest-event";
import { TypedEventService } from "./typed-event.service";


@Injectable({
  providedIn: "root"
})
export class FavsAndLatestEventService extends TypedEventService<FavsAndLatestEvent> {
}

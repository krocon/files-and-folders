import {Inject, Injectable} from "@angular/core";
import {EventManager} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

export type ShortcutActionMapping = { [key: string]: string };

@Injectable({
  providedIn: "root"
})
export class ShortcutListenService {

  get shortcutActionMapping(): ShortcutActionMapping {
    return this._shortcutActionMapping;
  }

  set shortcutActionMapping(value: ShortcutActionMapping) {
    this._shortcutActionMapping = value;
    this.init();
  }

  private _shortcutActionMapping: ShortcutActionMapping = {};

  constructor(
    private readonly eventManager: EventManager,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }


  init() {
    const map = this.shortcutActionMapping;
    for (const mapKey in map) {
      const event = `keydown.mapKey}`;
      const dispose = this.eventManager.addEventListener(
        this.document.documentElement, event, (e: KeyboardEvent) => {
          e.preventDefault();
          let actionId = map[mapKey];
          console.info('actionId: ', actionId);
        }
      );
    }
  }


}

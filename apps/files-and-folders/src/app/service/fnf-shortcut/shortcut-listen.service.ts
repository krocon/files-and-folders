import {Inject, Injectable} from "@angular/core";
import {EventManager} from "@angular/platform-browser";
import {DOCUMENT} from "@angular/common";

export type ShortcutActionMapping = { [key: string]: string };

@Injectable({
  providedIn: "root"
})
export class ShortcutListenService {

  constructor(
    private readonly eventManager: EventManager,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {
  }

  private _shortcutActionMapping: ShortcutActionMapping = {};

  get shortcutActionMapping(): ShortcutActionMapping {
    return this._shortcutActionMapping;
  }

  set shortcutActionMapping(value: ShortcutActionMapping) {
    this._shortcutActionMapping = value;
    this.init();
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

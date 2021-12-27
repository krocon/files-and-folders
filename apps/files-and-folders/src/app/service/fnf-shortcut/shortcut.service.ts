import { Injectable } from "@angular/core";
import hotkeys, { HotkeysEvent } from "hotkeys-js";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

export type ShortcutActionMapping = { [key: string]: string };

@Injectable({
  providedIn: "root"
})
export class ShortcutService {

  private static readonly config = {
    getShortcutActionMappingUrl: "assets/config/shortcut/windows.json"
  };
  readonly onActionId$ = new Subject<string>();

  constructor(
    private readonly httpClient: HttpClient
  ) {
  }

  static forRoot(config: { [key: string]: string }) {
    Object.assign(ShortcutService.config, config);
  }

  getShortcuts(): Observable<ShortcutActionMapping> {
    return this.httpClient.get<ShortcutActionMapping>(ShortcutService.config.getShortcutActionMappingUrl);
  }

  init() {
    const subscription = this.getShortcuts()
      .subscribe(sc => {
        subscription.unsubscribe();
        for (const key in sc) {
          const actionId = sc[key];
          hotkeys(key, (event: KeyboardEvent, handler: HotkeysEvent) => {
            event.preventDefault();
            this.onActionId$.next(actionId);
          });
        }
      });
  }

}

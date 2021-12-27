import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { TypedDataService } from "../../../common/typed-data.service";
import { PanelIndex } from "../data/panel-index";


@Injectable({
  providedIn: "root"
})
export class PanelSelectionService {


  private static readonly innerService =
    new TypedDataService<PanelIndex>("activePanelIndex", 0);


  public valueChanges(): BehaviorSubject<PanelIndex> {
    return PanelSelectionService.innerService.valueChanges$;
  }

  public toggle() {
    const pi = PanelSelectionService.innerService.getValue();
    PanelSelectionService.innerService.update(pi === 0 ? 1 : 0);
    PanelSelectionService.innerService.valueChanges$.next(this.getValue());
  }

  public update(panelIndex: PanelIndex) {
    PanelSelectionService.innerService.update(panelIndex);
    PanelSelectionService.innerService.valueChanges$.next(this.getValue());
  }

  public getValue(): PanelIndex {
    let panelIndex = PanelSelectionService.innerService.getValue();
    if (panelIndex === null) {
      panelIndex = 0;
    }
    return panelIndex;
  }
}

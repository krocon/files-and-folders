import {Injectable} from "@angular/core";
import {FileItemIf} from "@fnf/fnf-data";
import {GridApi} from "ag-grid-community";

@Injectable({
  providedIn: "root"
})
export class GridSelectionStoreService {


  storeSelection(api: GridApi): FileItemIf[] {
    const ret: FileItemIf[] = [];
    const selectedNodes = api.getSelectedNodes();
    for (let i = 0; i < selectedNodes.length; i++) {
      const f = selectedNodes[i].data;
      ret.push(f);
    }
    return ret;
  }

  restoreSelection(storedSelection: FileItemIf[], api: GridApi): void {
    api.forEachNode((node) => {
      const found = this.isStored(node.data, storedSelection);
      if (found) {
        node.setSelected(true, false);
      }
    });
  }

  isStored(file: FileItemIf, storedSelection: FileItemIf[]): boolean {
    if (storedSelection) {
      for (let i = 0; i < storedSelection.length; i++) {
        const f = storedSelection[i];
        if (f.base === file.base && f.dir === file.dir) {
          return true;
        }
      }
    }
    return false;
  }


  restoreFocusRow(focusRow: number, api: GridApi) {
    if (focusRow && api.getDisplayedRowCount() < focusRow) {
      api.ensureIndexVisible(focusRow, "middle");
      api.setFocusedCell(focusRow, "base");
    }
  }
}

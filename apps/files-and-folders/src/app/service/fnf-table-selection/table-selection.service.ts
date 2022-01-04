import {Injectable} from "@angular/core";
import {GridApi} from "ag-grid-community";
import {PanelIndex} from "../fnf-page-data/data/panel-index";
import {FileItemIf} from "@fnf/fnf-data";

@Injectable()
export class TableSelectionService {

  private readonly gridApis: GridApi[] = [new GridApi(), new GridApi()];
  private panelIndex: PanelIndex = 0;

  setGridApi(panelIndex: PanelIndex, gridApi: GridApi) {
    this.gridApis[panelIndex] = gridApi;
  }

  setActivPanelIndex(panelIndex: PanelIndex) {
    this.panelIndex = panelIndex;
  }

  enhanceSelection(pattern: RegExp) {
    this.getActiveGridApi().forEachNodeAfterFilter((node) => {
      if (!this.getActiveGridApi().isNodeSelected(node)) {
        const row = node.data;
        if (row.base.match(pattern)) {
          node.setSelected(true, false /* clear */);
        }
      }
    });
  }

  reduceSelection(pattern: RegExp) {
    this.getActiveGridApi().forEachNodeAfterFilter(node => {
      if (node.isSelected()) {
        const row = node.data;
        if (row.base.match(pattern)) {
          node.setSelected(false, false /* clear */);
        }
      }
    });
  }

  selectAll() {
    this.getActiveGridApi().forEachNodeAfterFilter(node => {
      if (!node.isSelected()) {
        node.setSelected(true, false /* clear */);
      }
    });
  }

  deselectAll() {
    this.getActiveGridApi().forEachNodeAfterFilter(node => {
      if (node.isSelected()) {
        node.setSelected(false, false /* clear */);
      }
    });
  }

  toggleSelection() {
    this.getActiveGridApi().forEachNodeAfterFilter(node => {
      if (node.isSelected()) {
        node.setSelected(false, false /* clear */);
      } else {
        node.setSelected(true, false /* clear */);
      }
    });
  };

  getSelectedData(): FileItemIf[] {
    const ret: FileItemIf[] = [];
    this.getActiveGridApi()
      .forEachNodeAfterFilter(node => {
        if (node.isSelected()) {
          ret.push(node.data);
        }
      });
    return ret;
  };

  getSelectedOrFocussedData(): FileItemIf[] {
    let ret = this.getSelectedData();
    if (!ret.length) {
      const frd = this.getFocusedRowData();
      if (frd) {
        ret = [frd];
      } else {
        ret = [];
      }
    }
    return ret;
  };

  getFocusedRowData(): FileItemIf | undefined {
    const rowIndex = this.getActiveGridApi().getFocusedCell()?.rowIndex;
    if (rowIndex) {
      return this.getActiveGridApi().getDisplayedRowAtIndex(rowIndex)?.data;
    }
    return undefined;
  };

  private getActiveGridApi(): GridApi {
    return this.gridApis[this.panelIndex];
  }

}

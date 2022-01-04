import {Injectable} from "@angular/core";
import {GridApi} from "ag-grid-community";
import {SelectionLabelData} from "../../../service/fnf-page-data/data/selection-label.data";

@Injectable({
  providedIn: "root"
})
export class GridSelectionCountService {

  getSelectionCountData(gridApi: GridApi): SelectionLabelData {
    return new SelectionLabelData(
      this.getSelectedSizeSumText(gridApi),
      this.getSizeSumText(gridApi),
      this.getSelectedFileCount(gridApi),
      this.getFileCount(gridApi),
      this.getSelectedFolderCount(gridApi),
      this.getFolderCount(gridApi)
    );
  }

  private getSizeSumText(gridApi: GridApi) {
    const sizeSum = this.getSizeSum(gridApi);
    return this.fileSizeSI(sizeSum);
  }

  private getSelectedSizeSumText(gridApi: GridApi) {
    const selectedSizeSum = this.getSelectedSizeSum(gridApi);
    return this.fileSizeSI(selectedSizeSum);
  }

  private fileSizeSI(bytes: number): string {
    //kB,MB,GB,TB,PB,EB,ZB,YB
    const exp = Math.log(bytes) / Math.log(1024) | 0;
    const result = (bytes / Math.pow(1024, exp)).toFixed(2);
    return result + " " + (exp == 0 ? "bytes" : "KMGTPEZY"[exp - 1] + "B");
  }

  private getSelectedFileCount(gridApi: GridApi): number {
    if (!gridApi) return 0;

    const rows = gridApi.getSelectedRows();
    let ret = 0;
    for (let i = 0; i < rows.length; i++) {
      if (!rows[i].isDir) ret++;
    }
    return ret;
  }

  private getSelectedSizeSum(gridApi: GridApi): number {
    if (!gridApi) return 0;

    const rows = gridApi.getSelectedRows();
    let ret = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].size) ret = ret + rows[i].size;
    }
    return ret / 1000;
  };

  private getSelectedFolderCount(gridApi: GridApi): number {
    if (!gridApi) return 0;

    const rows = gridApi.getSelectedRows();
    let ret = 0;
    for (let i = 0; i < rows.length; i++) {
      if (rows[i].isDir) ret++;
    }
    return ret;
  }

  private getFolderCount(gridApi: GridApi): number {
    if (!gridApi) return 0;

    let ret = 0;
    gridApi.forEachNode((node, index) => {
      if (node.data.isDir) ret++;
    });
    return ret;
  }

  private getFileCount(gridApi: GridApi): number {
    if (!gridApi) return 0;

    let ret = 0;
    gridApi.forEachNode((node, index) => {
      if (!node.data.isDir) ret++;
    });
    return ret;
  }

  private getSizeSum(gridApi: GridApi): number {
    if (!gridApi) return 0;

    let ret = 0;
    gridApi.forEachNode((node, index) => {
      if (node.data.size) ret = ret + node.data.size;
    });
    return ret / 1000;
  }


}

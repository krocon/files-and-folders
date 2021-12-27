import { Component, Input, OnDestroy, OnInit, Output } from "@angular/core";
import {
  CellFocusedEvent,
  ColumnApi,
  ComponentStateChangedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModelUpdatedEvent,
  RowDoubleClickedEvent
} from "ag-grid-community";
import {
  DirEventIf,
  DirPara,
  FileItem,
  FileItemIf,
  FindData,
  getParent,
  getZipUrlInfo,
  isRoot,
  isSameDir,
  isZipBase,
  isZipUrl,
  SEARCH_SYMBOL,
  ZipUrlInfo
} from "@fnf/fnf-data";
import { dirTableColumnDefs } from "./columndefs/dir-table-column-defs";
import { fromEvent, Subject, Subscription } from "rxjs";
import { RowNode } from "ag-grid-community/dist/lib/entities/rowNode";
import { TableSelectionService } from "../../service/fnf-table-selection/table-selection.service";
import { debounceTime, filter, takeWhile } from "rxjs/operators";
import { GridSelectionStoreService } from "./service/grid-selection-store.service";
import { PanelIndex } from "../../service/fnf-page-data/data/panel-index";
import { SelectionEvent } from "../../service/fnf-page-data/data/selection-event";
import { GridSelectionCountService } from "./service/grid-selection-count.service";
import { FileSystemService } from "../../service/fnf-file-system/file-system.service";
import { DOT_DOT } from "./columndefs/dot-dot";
import { FindSocketService } from "../../service/fnf-find/find.socketio.service";


@Component({
  selector: "fnf-dir-table",
  templateUrl: "./dir-table.component.html",
  styleUrls: ["./dir-table.component.scss"]
})
export class DirTableComponent implements OnInit, OnDestroy {
  @Output() changeDir: Subject<string> = new Subject<string>();
  @Output() selectionChanged: Subject<SelectionEvent> = new Subject<SelectionEvent>();
  @Output() cellFocused: Subject<CellFocusedEvent> = new Subject<CellFocusedEvent>();
  @Input() selectedFileItems: FileItemIf[] = [];
  @Input() focusRow = 0;
  @Input() panelIndex: PanelIndex = 0;
  columnDefs = dirTableColumnDefs;
  defaultColDef = {
    sortable: true,
    sortingOrder: ["asc", "desc"],
    rowClass: [],
    resizable: true,
    editable: false
  };
  gridOptions: GridOptions = {} as GridOptions;
  rowData: FileItemIf[] = [];
  loading = false;
  private gridApi?: GridApi;
  private gridColumnApi?: ColumnApi;
  private alive = true;
  private lastDir = "xxx";
  private subscription?: Subscription;

  constructor(
    private readonly selectionService: TableSelectionService,
    private readonly gridSelectionStoreService: GridSelectionStoreService,
    private readonly gridSelectionCountService: GridSelectionCountService,
    private readonly fileSystemService: FileSystemService,
    private readonly findSocketService: FindSocketService
  ) {
    this.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    this.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
  }

  private _counter = 0;

  get counter(): number {
    return this._counter;
  }

  @Input()
  set counter(value: number) {
    if (this._counter !== value) {
      this.loadDir();
    }
    this._counter = value;
  }

  private _findData: FindData | undefined;

  @Input() set findData(value: FindData | undefined) {
    const reload = (this._findData?.emmitDataKey !== value?.emmitDataKey);
    this._findData = value;
    if (value && reload) {
      this.loadFindData();
    }
  }

  private _selected = false;

  @Input()
  set selected(value: boolean) {
    this._selected = value;
    if (value && this.gridApi) {
      this.selectionService.setActivPanelIndex(this.panelIndex);
      this.gridSelectionStoreService.restoreFocusRow(this.focusRow, this.gridApi);
    }
  }

  private _filterValue = "";

  get filterValue(): string {
    return this._filterValue;
  }

  @Input()
  set filterValue(value: string) {
    this._filterValue = value;
    if (this.gridApi) {
      this.gridApi.onFilterChanged();
    }
  }

  private _dir = "/";

  get dir(): string {
    return this._dir;
  }

  @Input()
  set dir(value: string) {
    this.lastDir = this._dir;
    this._dir = value;
    this.loadDir();
  }


  ngOnInit(): void {
    this.alive = true;
    fromEvent(window, "resize")
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(500)
      )
      .subscribe((event) => {
        if (this.rowData?.length) {
          this.gridApi?.sizeColumnsToFit();
        }
      });
  }


  loadDir(): void {
    if (this._dir !== SEARCH_SYMBOL) {
      this.loading = true;
      this.rowData = [];

      if (this.subscription) {
        this.subscription.unsubscribe();
      }
      this.subscription = this.fileSystemService
        .fetchDir(new DirPara(this._dir, "panel-" + this.panelIndex))
        // .loadDir(new DirPara(this._dir, "panel-" + this.panelIndex, true))
        .pipe(
          takeWhile(() => this.alive),
          filter(o => !!o)
        )
        .subscribe(this.handleDirEvent.bind(this));
    }
  }


  loadFindData(): void {
    if (this._findData) {
      this.loading = true;
      this.rowData = [];

      this.findSocketService
        .find(this._findData, (data => {
          if (data.begin) {
            this.rowData = [];
          }
          if (data.end) {
            this.checkAndAddItems(data.items);
            setTimeout(() => this.gridOptions?.columnApi?.autoSizeAllColumns(true), 222); // TODO dirty
          }
        }));
    }
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onGridModelUpdatet($event: ModelUpdatedEvent) {
    if (this.gridApi) {
      this.gridSelectionStoreService.restoreSelection(this.selectedFileItems, this.gridApi);
      this.gridSelectionStoreService.restoreFocusRow(this.focusRow, this.gridApi);
      if (this._findData) {
        if (this.gridOptions?.columnApi && this.gridApi?.getModel()?.getRowCount()) {
          this.gridOptions.columnApi.autoSizeAllColumns(false);
        }
      } else {
        if (this.rowData?.length) {
          this.gridApi.sizeColumnsToFit();
        }
      }

      this.onSelectionChanged();
    }
  }

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
    this.selectionService.setGridApi(this.panelIndex, this.gridApi);
    if (this._selected) {
      this.selectionService.setActivPanelIndex(this.panelIndex);
    }
    this.gridColumnApi = event.columnApi;
    this.loadDir();
  }

  rowDoubleClicked($event: RowDoubleClickedEvent) {
    const data = $event.data;
    if (data.isDir) {
      if (data.base === "..") {
        this.changeDir.next(data.dir);
      } else {
        const path = data.dir + "/" + data.base;
        this.changeDir.next(path);
      }


    } else if (isZipBase(data.base)) {
      // wir navigieren in ein zip-File hinein:
      const path = data.dir + "/" + data.base + ":";
      this.changeDir.next(path);

    } else if (isZipUrl(data.dir)) {
      // wir navigieren in einem zip-File:
      const path = data.dir + "/" + data.base;
      this.changeDir.next(path);
    }
  }

  onSelectionChanged() {
    if (this.gridApi) {
      // .. should not be selectable:
      this.gridApi.forEachNode((node) => {
        if (node.data.base === DOT_DOT) {
          node.setSelected(false, false);
        }
      });
      const selectedFileItems = this.gridSelectionStoreService.storeSelection(this.gridApi);
      const selectionCountData = this.gridSelectionCountService.getSelectionCountData(this.gridApi);
      const se = new SelectionEvent(selectionCountData, selectedFileItems);
      this.selectionChanged.next(se);
    }
  }

  onComponentStateChanged($event: ComponentStateChangedEvent) {
    if (this.rowData?.length) {
      this.gridApi?.sizeColumnsToFit();
    }
  }

  isExternalFilterPresent(): boolean {
    return !!this._filterValue;
  }

  doesExternalFilterPass(node: RowNode): boolean {
    if (!this._filterValue) {
      return true;
    }
    const data: FileItemIf = node.data;
    const fl = this._filterValue.toLowerCase();
    const name = data.base + "." + data.ext;

    return name.toLowerCase().indexOf(fl) > -1;
  }

  onCellFocused(evt: CellFocusedEvent) {
    this.focusRow = evt.rowIndex ? evt.rowIndex : 0;
    this.cellFocused.next(evt);
  }

  private isRelevantDir(f1: string, f2: string, zi: ZipUrlInfo): boolean {
    const sd = isSameDir(f1, f2);
    if (sd) return true;
    return isSameDir(f1, zi.zipUrl + ":");

  }

  private handleDirEvent(dirEvents: DirEventIf[]) {

    if (this.gridApi && dirEvents) {
      for (let i = 0; i < dirEvents.length; i++) {
        const dirEvent = dirEvents[i];
        const zi: ZipUrlInfo = getZipUrlInfo(this._dir);

        if (this.isRelevantDir(dirEvent.dir, this._dir, zi)) {
          if (dirEvent.action === "list") {
            this.rowData = dirEvent.items ?
              dirEvent.items.filter(fi => (
                fi.dir === this._dir
                || isSameDir(fi.dir, this._dir)
                || isRoot(fi.dir) && isRoot(zi.zipInnerUrl))
              ) :
              [];

            if (!isRoot(this._dir)) {
              this.rowData = [
                new FileItem(getParent(this._dir), "..", "", "", "", 1, true),
                ...this.rowData
              ];
            }

            if (this.focusRow >= this.rowData.length) {
              this.focusRow = this.rowData.length - 1;
              this.gridApi.setFocusedCell(this.focusRow, "base");
            }
            this.gridApi.setRowData(this.rowData);

            // Wir setzen den Focus auf das neue Verzeichnis:
            // const rowCount = this.gridApi.getDisplayedRowCount();
            // for (let i = 0; i < rowCount; i++) {
            //   const rowNode = this.gridApi.getDisplayedRowAtIndex(i);
            //   if (rowNode?.data === dirEvent.items[0]) {
            //     this.gridApi.ensureIndexVisible(i, "middle");
            //     this.gridApi.setFocusedCell(i, "base");
            //     this.focusRow = i;
            //     return;
            //   }
            // }

          } else if (dirEvent.action === "add" || dirEvent.action === "addDir") {
            this.checkAndAddItems(dirEvent.items);
          } else if (dirEvent.action === "unlink" || dirEvent.action === "unlinkDir") {
            this.checkAndRemoveItems(dirEvent.items);

          } else if (dirEvent.action === "unselect") {
            const names = dirEvent.items.map(it => it.base);
            this.gridApi.forEachNodeAfterFilter(node => {
              const data: FileItemIf = node.data;
              if (names.indexOf(data.base) > -1) {
                node.setSelected(false);
              }
            });

          } else if (dirEvent.action === "change") {
            this.loadDir(); // zu hart?

          } else {
            console.warn("Unknown dir event action:", dirEvent);
          }

        }
      }
    }
  }

  private checkAndAddItems(items: FileItemIf[]) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      if (this.getIndexInRowData(item) === -1) {
        this.rowData.push(item);
      }
    }
    this.gridApi?.setRowData(this.rowData);
  }

  private checkAndRemoveItems(items: FileItemIf[]) {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const idx = this.getIndexInRowData(item);
      if (idx > -1) {
        this.rowData.splice(idx, 1);
      }
    }
    if (this.focusRow >= this.rowData.length) {
      this.focusRow = this.rowData.length - 1;
      this.gridApi?.setFocusedCell(this.focusRow, "base");
    }
    this.gridApi?.setRowData(this.rowData);
  }

  private getIndexInRowData(item: FileItemIf): number {
    for (let i = 0; i < this.rowData.length; i++) {
      const row = this.rowData[i];
      if (row.dir === item.dir && row.base === item.base) {
        return i;
      }
    }
    return -1;
  }


}

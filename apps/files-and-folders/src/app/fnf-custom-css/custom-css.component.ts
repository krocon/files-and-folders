import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { LookAndFeelService } from "../service/fnf-look-and-feel/look-and-feel.service";
import { debounceTime, distinctUntilChanged, takeWhile } from "rxjs/operators";
import { CssColorEditService } from "./service/css-color-edit.service";
import { CustomCssItem } from "./data/custom-css-item.data";
import {
  CellFocusedEvent,
  ColumnApi,
  ComponentStateChangedEvent,
  GridApi,
  GridOptions,
  GridReadyEvent,
  ModelUpdatedEvent,
  RowDoubleClickedEvent,
  SelectionChangedEvent
} from "ag-grid-community";
import { customCssTableColumnDefs } from "./columndefs/custom-css-table-column-defs";
import { CssColors } from "@fnf/fnf-data";
import { RowNode } from "ag-grid-community/dist/lib/entities/rowNode";
import { Subject } from "rxjs";
import { TableFilterData } from "./table-filter.data";
import { Theme } from "./data/css-theme-type";
import { customCcsKeys, CustomCcsKeyType } from "./data/custom-ccs-key.type";
import { CssArea } from "./data/css-area.type";
import { CssType } from "./data/css-type.type";

@Component({
  selector: "fnf-custom-css",
  templateUrl: "./custom-css.component.html",
  styleUrls: ["./custom-css.component.scss"]
})
export class CustomCssComponent implements OnInit, OnDestroy {

  @ViewChild("resultingColorDiv") resultingColorDiv?: ElementRef<HTMLElement>;
  columnDefs = customCssTableColumnDefs;
  defaultColDef = {
    sortable: true,
    sortingOrder: ["asc", "desc"],
    rowClass: [],
    resizable: true,
    editable: false
  };
  gridOptions: GridOptions = {} as GridOptions;
  rowData: CustomCssItem[] = [];

  // Filter:
  filterChanged: Subject<any> = new Subject<any>();
  filter = new TableFilterData();

  areas: CssArea[] = [];
  types: CssType[] = [];
  keys: CustomCcsKeyType[] = [];
  colors: string[] = [];
  loading = false;
  color = "#fff";
  themes: Theme[] = [];

  private gridApi?: GridApi;
  private gridColumnApi?: ColumnApi;
  private alive = true;
  private theme: string = "light";

  constructor(
    private readonly lookAndFeelService: LookAndFeelService,
    private readonly cssColorEditService: CssColorEditService
  ) {
    this.gridOptions.isExternalFilterPresent = this.isExternalFilterPresent.bind(this);
    this.gridOptions.doesExternalFilterPass = this.doesExternalFilterPass.bind(this);
  }

  ngOnInit(): void {
    this.lookAndFeelService
      .getAvailableThemes()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(themes => {
        this.themes = themes;
      });

    this.theme = this.lookAndFeelService.getTheme();
    this.lookAndFeelService
      .getColors(this.theme)
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(c => {
        this.rowData = this.cssColorEditService.buildTableRows(c);
        this.gridApi?.setRowData(this.rowData);

        this.keys = customCcsKeys
          .filter(k => k !== "--fnf-table-font-size" && k !== "--fnf-header-input-border");

        this.areas = this.rowData
          .map(r => r.area)
          .filter((c, i, arr) => arr.indexOf(c) === i)
          .sort();

        this.types = this.rowData
          .map(r => r.type)
          .filter((c, i, arr) => arr.indexOf(c) === i)
          .sort();

        this.buildColors();
      });
    this.filterChanged
      .pipe(
        takeWhile(() => this.alive),
        debounceTime(300), // wait 300ms after the last event before emitting last event
        distinctUntilChanged() // only emit if value is different from previous value
      )
      .subscribe(model => {
        if (this.gridOptions.api) {
          this.gridOptions.api.onFilterChanged();
        }
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }


  isExternalFilterPresent(): boolean {
    return !!(this.filter.text || this.filter.area || this.filter.type);
  }

  doesExternalFilterPass(node: RowNode): boolean {
    const data: CustomCssItem = node.data;
    if (this.filter.text && data.cssKey.indexOf(this.filter.text) === -1 && data.cssColor.indexOf(this.filter.text) === -1) return false;
    if (this.filter.type !== "all" && this.filter.type !== "" && data.type !== this.filter.type) return false;
    if (this.filter.area !== "all" && this.filter.area !== "" && data.area !== this.filter.area) return false;

    return true;
  }

  resetFilter(): void {
    this.filter = new TableFilterData();
    this.filterChanged.next(Date.now() + "");
  }

  setTheme(theme: Theme) {
    this.lookAndFeelService.loadAndApplyLookAndFeel(theme);
    const subs = this.lookAndFeelService
      .getColors(theme)
      .subscribe(colors => {
        this.rowData = this.cssColorEditService.buildTableRows(colors);
        this.gridApi?.setRowData(this.rowData);
        subs.unsubscribe();
      });
  }

  onCellFocused($event: CellFocusedEvent) {

  }

  rowDoubleClicked($event: RowDoubleClickedEvent) {
    console.info(JSON.stringify($event.data, null, 4));
  }

  onGridModelUpdatet($event: ModelUpdatedEvent) {

  }

  onGridReady($event: GridReadyEvent) {
    this.gridApi = $event.api;
    this.gridColumnApi = $event.columnApi;
  }

  onComponentStateChanged($event: ComponentStateChangedEvent) {

  }

  onSelectionChanged($event: SelectionChangedEvent) {
    if (this.gridApi) {
      const selectedRows = this.gridApi.getSelectedRows() as CustomCssItem[];
      if (selectedRows.length) {
        const row = selectedRows[0];
        this.color = row.cssColor;
      }
    }
  }

  onInputChanged() {
    if (this.gridApi) {
      const selectedRows = this.gridApi.getSelectedRows() as CustomCssItem[];
      const keys = selectedRows.map(r => r.cssKey);
      const colors: CssColors = {};
      if (selectedRows.length) {
        selectedRows.forEach(r => {
          colors[r.cssKey] = this.color;
        });
        this.rowData.forEach(r => {
          if (keys.indexOf(r.cssKey) > -1) {
            r.cssColor = this.color;
          }
        });
        this.gridApi.refreshCells();
        this.lookAndFeelService.applyColors(colors);
        this.lookAndFeelService.emitColors(colors);
      }
    }
    this.buildColors();
  }

  onColorPickerChange(event: string) {
    // this.color wird vom Picker gesetzt
    this.onInputChanged();
  }

  onSelectboxColorsChanged(event: any) {
    this.color = event;
    this.onInputChanged();
  }

  onSelectboxVarsChanged(event: any) {
    this.color = "var(" + event + ")";
    this.onInputChanged();
  }

  selectVisible() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
      this.gridApi.forEachNodeAfterFilter(n => {
        n.setSelected(true, false);
        n.data.selected = true;
      });
    }
  }

  deSelectAll() {
    if (this.gridApi) {
      this.gridApi.deselectAll();
      this.gridApi.refreshCells();
    }
  }

  debug() {
    const colors: { [key: string]: string } = {};
    this.rowData.forEach(r => {
      colors[r.cssKey] = r.cssColor;
    });
    console.clear();
    console.info(JSON.stringify(colors, null, 4));
  }

  private buildColors() {
    this.colors = this.rowData
      .filter(r => r.type !== "size" && r.type !== "border" && r.cssColor.indexOf("--") === -1)
      .map(r => r.cssColor)
      .filter((c, i, arr) => arr.indexOf(c) === i) // doppelte Einträge raus
      .sort();
  }

}

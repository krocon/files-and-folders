import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { TabData } from "../../../service/fnf-page-data/data/tab.data";
import { Sysinfo, SysinfoIf } from "@fnf/fnf-data";
import { TabsPanelData } from "../../../service/fnf-page-data/data/tabs-panel.data";
import { PanelIndex } from "../../../service/fnf-page-data/data/panel-index";


@Component({
  selector: "fnf-dir-tabs",
  templateUrl: "./dir-tabs.component.html",
  styleUrls: ["./dir-tabs.component.scss"]
})
export class DirTabsComponent {

  @Input() panelIndex: PanelIndex = 0;
  @Input() selected = false;
  @Input() winDrives: string[] = [];
  @Input() latest: string[] = [];
  @Input() favs: string[] = [];
  @Input() sysinfo: SysinfoIf = new Sysinfo();
  @Output() readonly dataChanged = new EventEmitter<TabsPanelData>();
  @Output() readonly filterChanged = new EventEmitter<TabsPanelData>();
  @ViewChild("filter") filterElement?: ElementRef<HTMLInputElement>;


  selectedTabIndex = 0;
  selectedTabData: TabData = new TabData("/");
  filterVisible = false;

  private _tabsPanelData: TabsPanelData = new TabsPanelData(0, [new TabData("/")]);

  get tabsPanelData(): TabsPanelData {
    return this._tabsPanelData;
  }

  @Input()
  set tabsPanelData(value: TabsPanelData) {
    this._tabsPanelData = value;
    this.sync();
  }

  // private _fileData: FilePageData = new FilePageData();
  //
  // get fileData() {
  //   return this._fileData;
  // }
  //
  // @Input() set fileData(value: FilePageData) {
  //   this._fileData = value;
  //   if (this._fileData && this._fileData.tabRows && this._fileData.tabRows.length) {
  //     this.selectedTabIndex = this._fileData.tabRows[this.panelIndex].selectedTabIndex;
  //     if (this._fileData.tabRows[this.panelIndex].tabs.length) {
  //       this.selectedTabData = this._fileData.tabRows[this.panelIndex].tabs[this.selectedTabIndex];
  //       this.filterVisible = this.selectedTabData?.meta.filterActive;
  //     }
  //   }
  //   this.filterChanged.next(this._fileData);
  // }

  onSelectionChanged($event: number) {
    if ($event > -1) {
      this._tabsPanelData.selectedTabIndex = $event;
      this.selectedTabIndex = $event;

      this.sync();
    }
  }

  onAddTabClicked($event: MouseEvent) {
    this._tabsPanelData.tabs.push(this.clone(this.selectedTabData));
    this._tabsPanelData.selectedTabIndex = this._tabsPanelData.tabs.length - 1;
    this.sync();
    this.dataChanged.next(this._tabsPanelData);
  }

  onRemoveTabClicked($event: MouseEvent) {
    if (this._tabsPanelData.tabs.length > 1) {
      this._tabsPanelData.tabs.splice(this._tabsPanelData.selectedTabIndex, 1);
      this.selectedTabData = this._tabsPanelData.tabs[this.selectedTabIndex];
      this.filterVisible = this.selectedTabData?.meta.filterActive;
      if (this.selectedTabIndex > 0) {
        this.selectedTabIndex--;
      }
      this.sync();
      this.dataChanged.next(this._tabsPanelData);
    }
  }

  fixTabLabel(p: string): string | undefined {
    if (!p) {
      return "";
    }
    p = p
      .replace(/\\/g, "/")
      .replace(/\/\//g, "/");

    if (p === "/") {
      return "/";
    }

    if (p.length > 1 && p.endsWith("/")) {
      p = p.substr(0, p.length - 1);
    }
    return p
      .split("/")
      .pop();
  }

  toggleFilterInput() {
    this.filterVisible = !this.filterVisible;

    this._tabsPanelData.tabs[this._tabsPanelData.selectedTabIndex].meta.filterActive = this.filterVisible;

    this.filterChanged.next(this._tabsPanelData);

    if (this.filterVisible) {
      setTimeout(() => {
        // this will make the execution after the above boolean has changed
        if (this.filterElement) {
          this.filterElement.nativeElement.focus();
          this.filterElement.nativeElement.select();
        }
      }, 0);
    }
  }

  onFilterChangedByUser() {
    this.filterChanged.next(this._tabsPanelData);
  }

  private sync() {
    this.selectedTabIndex = this._tabsPanelData.selectedTabIndex;
    this.selectedTabData = this._tabsPanelData.tabs[this.selectedTabIndex];
    this.filterVisible = this.selectedTabData?.meta.filterActive;
    this.dataChanged.next(this._tabsPanelData);
  }

  private clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }
}

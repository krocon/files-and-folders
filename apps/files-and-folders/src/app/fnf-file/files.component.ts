import {Component, OnDestroy, OnInit} from "@angular/core";
import {FilePageDataService} from "../service/fnf-page-data/file-page-data.service";
import {takeWhile, tap} from "rxjs/operators";
import {FilePageData} from "../service/fnf-page-data/data/file-page.data";
import {SysinfoService} from "../service/fnf-sysinfo/sysinfo.service";
import {FileItemIf, FindData, Sysinfo, SysinfoIf} from "@fnf/fnf-data";
import {FavsAndLatestEventService} from "./footer/fnf-file-menu/event/favs-and-latest-event.service";
import {FavDataService} from "../service/fnf-page-data/service/fav-data.service";
import {LatestDataService} from "../service/fnf-page-data/service/latest-data.service";
import {ShortcutService} from "../service/fnf-shortcut/shortcut.service";
import {ActionService} from "../service/fnf-action/action.service";
import {TabData} from "../service/fnf-page-data/data/tab.data";
import {PanelIndex} from "../service/fnf-page-data/data/panel-index";
import {TabsPanelData} from "../service/fnf-page-data/data/tabs-panel.data";
import {PanelSelectionService} from "../service/fnf-page-data/service/panel-selection.service";
import {SelectionLabelData} from "../service/fnf-page-data/data/selection-label.data";
import {SelectionEvent} from "../service/fnf-page-data/data/selection-event";
import {CellFocusedEvent} from "ag-grid-community";
import {FileSystemService} from "../service/fnf-file-system/file-system.service";
import {ConfigService} from "../service/fnf-config/config.service";


@Component({
  selector: "fnf-files",
  templateUrl: "./files.component.html",
  styleUrls: ["./files.component.scss"]
})
export class FilesComponent implements OnInit, OnDestroy {

  public activePanelIndex: PanelIndex = this.panelSelectionService.getValue();
  public filePageData: FilePageData = this.filePageDataService.getValue();
  public path0 = "/";
  public path1 = "/";
  public findData0: FindData | undefined = undefined;
  public findData1: FindData | undefined = undefined;
  public activePath = this.path0;
  public filterValue0 = "";
  public filterValue1 = "";

  public winDrives: string[] = [];

  public sysinfo: SysinfoIf = new Sysinfo();
  public latest: string[] = [];
  public favs: string[] = [];
  public dockerRoot = '';


  public selectedFileItems0: FileItemIf[] = [];
  public selectedFileItems1: FileItemIf[] = [];
  public focusRow0 = 0;
  public focusRow1 = 0;

  public selectionLabelData0: SelectionLabelData = new SelectionLabelData();
  public selectionLabelData1: SelectionLabelData = new SelectionLabelData();
  public activeSelectedFiles: FileItemIf[] = [];

  public counter = 0;

  private alive = true;

  constructor(
    private readonly filePageDataService: FilePageDataService,
    private readonly favDataService: FavDataService,
    private readonly latestDataService: LatestDataService,
    private readonly favsAndLatestEventService: FavsAndLatestEventService,
    private readonly sysinfoService: SysinfoService,
    private readonly shortcutService: ShortcutService,
    private readonly actionService: ActionService,
    private readonly panelSelectionService: PanelSelectionService,
    private readonly fileSystemService: FileSystemService,
    private readonly configService: ConfigService,
  ) {
  }

  ngOnInit(): void {
    this.updatePathes();
    this.configService
      .getConfig()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(config => {
        this.dockerRoot = config.dockerRoot;
      });

    this.panelSelectionService
      .valueChanges()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        panelIndex => {
          this.activePanelIndex = panelIndex;
        });

    this.shortcutService
      .onActionId$
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        actionKey => {
          const actionId = this.actionService.getActionIdByString(actionKey);
          this.actionService.doAction(actionId);
        });

    this.favDataService
      .valueChanges()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(o => {
        this.favs = o.filter((his, i, arr) => arr.indexOf(his) === i);
      });
    this.latestDataService
      .valueChanges()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(o => {
        this.latest = o.filter((his, i, arr) => arr.indexOf(his) === i);
      });
    this.sysinfoService
      .getDrives()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        winDrives => {
          this.winDrives = winDrives;
        });

    this.sysinfoService
      .getSysinfo()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(
        sysinfo => {
          this.sysinfo = sysinfo;
        });


    this.filePageDataService
      .valueChanges()
      .pipe(
        takeWhile(() => this.alive),
        tap(
          // mit Seiteneffekt!
          fd =>
            fd.tabRows.forEach(tr =>
              tr.tabs
                .forEach(t =>
                  t.path = t.path
                    .replace(/\\/g, "/")
                    .replace(/\/\//g, "/"))
            )
        )
      )
      .subscribe(fd => {
        this.filePageData = fd;
        this.updatePathes();
      });

    this.favsAndLatestEventService
      .valueChanges()
      .pipe(
        takeWhile(() => this.alive)
      )
      .subscribe(favsAndLatestEvent => {
        this.setPathToActiveTabInGivenPanel(favsAndLatestEvent.path, favsAndLatestEvent.panelIndex);
      });
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  onTabDataChanged(tabsPanelData: TabsPanelData, panelIndex: PanelIndex): void {
    this.filePageData.tabRows[panelIndex] = tabsPanelData;
    this.updatePathes();
    this.filePageDataService.update(this.filePageData);
  }

  onBreadcrumbClicked(path: string, panelIndex: PanelIndex): void {
    this.setPathToActiveTabInGivenPanel(path, panelIndex);
  }

  onChangeDir(path: string, panelIndex: PanelIndex) {
    this.setPathToActiveTabInGivenPanel(path, panelIndex);
  }

  onFilterChanged(tabsPanelData: TabsPanelData, panelIndex: PanelIndex): void {
    this.filePageData.tabRows[panelIndex] = tabsPanelData;

    const tabData0 = this.getTabDataForPanelIndex(0);
    this.filterValue0 = tabData0?.meta?.filterActive ? tabData0.meta.filterText : "";

    const tabData1 = this.getTabDataForPanelIndex(1);
    this.filterValue1 = tabData1?.meta?.filterActive ? tabData1.meta.filterText : "";
  }

  onToggleFavClicked(path: string): void {
    this.favDataService.toggleFav(path);
  }

  setActivePanel(panelIndex: PanelIndex): void {
    this.panelSelectionService.update(panelIndex);
    this.onActiveSelectionChanged();
  }

  onActiveSelectionChanged() {
    const panelIndex = this.panelSelectionService.getValue();
    const tabsPanelData = this.filePageData.tabRows[panelIndex];
    const tabData = tabsPanelData.tabs[tabsPanelData.selectedTabIndex];
    this.activeSelectedFiles = tabData.meta.selectedFileItems;
  }

  onSelectionChanged($event: SelectionEvent, panelIndex: PanelIndex) {
    if ($event) {
      const tabsPanelData = this.filePageData.tabRows[panelIndex];
      const tabData = tabsPanelData.tabs[tabsPanelData.selectedTabIndex];
      tabData.meta.selectedFileItems = $event.fileItems;
      // we want to store the selection:
      this.filePageDataService.update(this.filePageData);

      if (panelIndex === 0) {
        this.selectionLabelData0 = $event.selectionLabelData;
      } else {
        this.selectionLabelData1 = $event.selectionLabelData;
      }
      this.onActiveSelectionChanged();
    }
  }

  onFocusChanged($event: CellFocusedEvent, panelIndex: PanelIndex) {
    if ($event) {
      const tabsPanelData = this.filePageData.tabRows[panelIndex];
      const tabData = tabsPanelData.tabs[tabsPanelData.selectedTabIndex];
      tabData.meta.focusRow = $event.rowIndex ? $event.rowIndex : 0;
      // we want to store the selection:
      this.filePageDataService.update(this.filePageData);
    }
  }

  private setPathToActiveTabInGivenPanel(
    path: string,
    panelIndex: PanelIndex = this.activePanelIndex
  ): void {
    const subs = this.fileSystemService
      .checkPath(path)
      .subscribe(path => {
          subs.unsubscribe();
          const tabData = this.getTabDataForPanelIndex(panelIndex);
          tabData.path = path;
          // add path on top:
          tabData.history.splice(0, 0, path);
          // remove double items:
          tabData.history = tabData.history
            .filter((his, i, arr) => arr.indexOf(his) === i);
          // max count = 6:
          if (tabData.history.length > 6) {
            tabData.history.length = 6;
          }
          this.latestDataService.addLatest(path);
          this.filePageDataService.update(this.filePageData);
        },
        error => {
          subs.unsubscribe();
          console.error(error);
        });
  }

  private model2local(panelIndex: 0 | 1) {
    const tabData = this.getTabDataForPanelIndex(panelIndex);
    if (tabData) {
      const subs = this.fileSystemService
        .checkPath(tabData.path)
        .subscribe(path => {
            if (tabData.path === path) {
              if (panelIndex === 0) {
                this.path0 = tabData.path;
                this.findData0 = tabData.findData;
                this.selectedFileItems0 = tabData.meta.selectedFileItems;
                this.focusRow0 = tabData.meta.focusRow;
                this.activePath = this.path0;
              } else {
                this.path1 = tabData.path;
                this.findData1 = tabData.findData;
                this.selectedFileItems1 = tabData.meta.selectedFileItems;
                this.focusRow1 = tabData.meta.focusRow;
                this.activePath = this.path1;
              }
            } else {
              this.setPathToActiveTabInGivenPanel(path, panelIndex);
            }
          },
          error => {
            subs.unsubscribe();
            console.error(error);
          });
    }
  }

  private updatePathes(): void {
    this.model2local(0);
    this.model2local(1);
    this.counter = this.filePageData.counter;
  }

  private getTabDataForPanelIndex(panelIndex: 0 | 1): TabData {
    const tabsPanelData = this.filePageData.tabRows[panelIndex];
    return tabsPanelData.tabs[tabsPanelData.selectedTabIndex];
  }

  private clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }
}

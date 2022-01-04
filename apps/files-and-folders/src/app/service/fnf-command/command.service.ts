import {Injectable} from "@angular/core";
import {FilePageDataService} from "../fnf-page-data/file-page-data.service";
import {LookAndFeelService} from "../fnf-look-and-feel/look-and-feel.service";
import {ActionId} from "../fnf-action/fnf-action.enum";
import {TableSelectionService} from "../fnf-table-selection/table-selection.service";
import {PanelIndex} from "../fnf-page-data/data/panel-index";
import {PanelSelectionService} from "../fnf-page-data/service/panel-selection.service";
import {TabData} from "../fnf-page-data/data/tab.data";
import {EditDataService} from "../../fnf-edit/fnf-edit-data/edit-data.service";
import {Router} from "@angular/router";
import {Theme} from "../../fnf-custom-css/data/css-theme-type";
import {MkdirDialogService} from "../../fnf-file/dialog/mkdir/mkdir-dialog.service";
import {MkdirDialogData} from "../../fnf-file/dialog/mkdir/mkdir-dialog.data";
import {FileItemIf, FilePara, FindData, FindDialogData, SEARCH_SYMBOL} from "@fnf/fnf-data";
import {FileActionService} from "../fnf-page-data/service/file-action.service";
import {CopyOrMoveDialogData} from "../../fnf-file/dialog/copyormovedir/copy-or-move-dialog.data";
import {CopyOrMoveDialogService} from "../../fnf-file/dialog/copyormovedir/copy-or-move-dialog.service";
import {FindDialogService} from "../../fnf-file/dialog/find/find-dialog.service";
import {FindSocketService} from "../fnf-find/find.socketio.service";


@Injectable({
  providedIn: "root"
})
export class CommandService {

  private _theme = "light";


  constructor(
    private readonly filePageDataService: FilePageDataService,
    private readonly lookAndFeelService: LookAndFeelService,
    private readonly tableSelectionService: TableSelectionService,
    private readonly panelSelectionService: PanelSelectionService,
    private readonly editDataService: EditDataService,
    private readonly mkdirDialogService: MkdirDialogService,
    private readonly fileActionService: FileActionService,
    private readonly selectionService: TableSelectionService,
    private readonly copyOrMoveDialogService: CopyOrMoveDialogService,
    private readonly findDialogService: FindDialogService,
    private readonly findSocketService: FindSocketService,
    private readonly router: Router
  ) {
  }

  // TODO callActionById: richtiges Mapping
  public callActionById(actionId: string): void {
    if (actionId === "SPACE_PRESSED")  this.togglePanel()
     else if (actionId === "HOME_PRESSED")  this.togglePanel()
     else if (actionId === "END_PRESSED") this.togglePanel()
     else if (actionId === "PAGEUP_PRESSED")  this.togglePanel()
     else if (actionId === "PAGEDOWN_PRESSED")  this.togglePanel()
     else if (actionId === "ENTER_PRESSED")  this.togglePanel()
     else if (actionId === "TOGGLE_SELECTION_CURRENT_ROW")  this.togglePanel()
     else if (actionId === "OPEN_GOTO_ANYTHING_DLG")  this.togglePanel()
     else if (actionId === "OPEN_COPY_DLG")  this.togglePanel()
     else if (actionId === "OPEN_MOVE_DLG")  this.togglePanel()
     else if (actionId === "OPEN_MKDIR_DLG")  this.togglePanel()
     else if (actionId === "OPEN_DELETE_DLG")  this.togglePanel()
     else if (actionId === "OPEN_DELETE_EMPTY_FOLDERS_DLG")  this.togglePanel()
     else if (actionId === "OPEN_CHDIR_DLG")  this.togglePanel()
     else if (actionId === "SELECT_LEFT_PANEL")  this.togglePanel()
     else if (actionId === "SELECT_RIGHT_PANEL")  this.togglePanel()
     else if (actionId === "TOGGLE_PANEL")  this.togglePanel()
     else if (actionId === "ADD_NEW_TAB")  this.togglePanel()
     else if (actionId === "REMOVE_TAB")  this.togglePanel()
     else if (actionId === "SAVE_CONFIG")  this.togglePanel()
     else if (actionId === "OPEN_GROUPFILES_DLG")  this.togglePanel()
     else if (actionId === "OPEN_FIND_DUBLICATES_DLG")  this.togglePanel()
     else if (actionId === "OPEN_MULTIRENAME_DLG")  this.togglePanel()
     else if (actionId === "OPEN_RENAME_DLG")  this.togglePanel()
     else if (actionId === "OPEN_FIND_DLG")  this.togglePanel()
     else if (actionId === "RELOAD_DIR")  this.togglePanel()
     else if (actionId === "OPEN_SELECT_DLG")  this.togglePanel()
     else if (actionId === "SELECT_ALL")  this.togglePanel()
     else if (actionId === "OPEN_DESELECT_DLG")  this.togglePanel()
     else if (actionId === "DESELECT_ALL")  this.togglePanel()
     else if (actionId === "TOGGLE_SELECTION")  this.togglePanel()
     else if (actionId === "NAVIGATE_LEVEL_DOWN")  this.togglePanel()
     else if (actionId === "NAVIGATE_BACK")  this.togglePanel()
     else if (actionId === "DUMMY_ACTION")  this.togglePanel()
  }

  public setTheme(theme: Theme): void {
    this._theme = theme;
    this.lookAndFeelService.loadAndApplyLookAndFeel(theme);
  }


  togglePanel() {
    this.panelSelectionService.toggle();
  }

  setPanelActive(panelIndex: PanelIndex) {
    this.panelSelectionService.update(panelIndex);
  }

  onAddTabClicked() {
    const value = this.filePageDataService.getValue();
    const tabsPanelData = value.tabRows[this.panelSelectionService.getValue()];
    const selectedTabIndex = tabsPanelData.selectedTabIndex;
    const tabData = tabsPanelData.tabs[selectedTabIndex];
    tabsPanelData.tabs.push(this.clone(tabData));
    tabsPanelData.selectedTabIndex = tabsPanelData.tabs.length - 1;
    this.filePageDataService.update(value);
  }

  onRemoveTabClicked() {
    const value = this.filePageDataService.getValue();
    const tabsPanelData = value.tabRows[this.panelSelectionService.getValue()];
    if (tabsPanelData.tabs.length > 1) {
      const selectedTabIndex = tabsPanelData.selectedTabIndex;
      tabsPanelData.tabs.splice(selectedTabIndex, 1);
      tabsPanelData.selectedTabIndex = Math.min(tabsPanelData.tabs.length - 1, selectedTabIndex);
      this.filePageDataService.update(value);
    }
  }

  copyFullNames() {
    const value = this.filePageDataService.getValue();
    // this.tableSelectionService.
  }

  copyNames() {
    // TODO
  }

  copyFullNamesAsJson() {
    // TODO
  }

  copyNamesAsJson() {
    // TODO
  }

  toggleCurrentRow() {
    // TODO
  }

  sumSize() {
    // TODO
  }

  onEnterPressed() {
    // TODO
  }

  onHomePressed() {
    // TODO
  }

  onEndPressed() {
    // TODO
  }

  onPageUpPressed() {
    // TODO
  }

  addNewTabOnActivePanel() {
    // TODO
  }

  onPageDownPressed() {
    // TODO
  }

  reloadDir() {
    const v = this.filePageDataService.getValue();
    v.counter++;
    this.filePageDataService.update(v);
  }

  selectRightPanel() {
    this.tableSelectionService.setActivPanelIndex(1);
  }

  selectLeftPanel() {
    this.tableSelectionService.setActivPanelIndex(0);
  }

  saveconfig() {
    // TODO  löschen?
  }

  selectAll() {
    this.tableSelectionService.selectAll();
  }

  deselectAll() {
    this.tableSelectionService.deselectAll();
  }

  toggleSelection() {
    this.tableSelectionService.toggleSelection();
  }

  removeTabOnActivePanel() {
    // TODO
  }

  navigateBack() {
    // TODO
  }

  navigateDown() {
    // TODO
  }

  openDialog(actionId: ActionId) {
    // TODO
  }

  debug() {
    console.info("____________________________");
    console.info(JSON.stringify(
      this.filePageDataService.getValue(), null, 4));
  }

  editFile(name: string) {
    const idx = this.editDataService.addFile(name) - 1;
    this.router.navigate(["/edit/" + idx]);
  }

  openCreateDirDialog(name: string) {
    this.mkdirDialogService.open(
      new MkdirDialogData(name, this.getSelectedTabData().path),
      (fileItem) => {

        const filePara = new FilePara(undefined, fileItem, "mkdir");
        const sub = this.fileActionService
          .do(filePara)
          .subscribe(
            (ret) => {
              sub.unsubscribe();
              // this.reloadDir();
            }
          );
      });
  }

  copy() {
    const selectedData = this.selectionService.getSelectedOrFocussedData();
    let sources: string[] = this.getSourcePaths(selectedData);
    this.copyOrMoveDialogService
      .open(
        new CopyOrMoveDialogData(sources, this.getOtherPanelSelectedTabData().path, "copy"),
        (target) => {
          const items = selectedData.map(item => new FilePara(item, target, "copy"));
          this.fileActionService.multiDo(items);
        }
      );
  }

  move() {
    const selectedData = this.selectionService.getSelectedOrFocussedData();
    let sources: string[] = this.getSourcePaths(selectedData);

    const target = this.getOtherPanelSelectedTabData().path;

    this.copyOrMoveDialogService
      .open(
        new CopyOrMoveDialogData(sources, target, "move"),
        (target) => {
          if (target) {
            const items = selectedData.map(item => new FilePara(item, target, "move"));
            this.fileActionService.multiDo(items);
          }
        }
      );
  }

  delete() {
    const selectedData = this.selectionService.getSelectedOrFocussedData();
    let sources: string[] = this.getSourcePaths(selectedData);
    this.copyOrMoveDialogService
      .open(
        new CopyOrMoveDialogData(sources, "", "delete"),
        (target) => {
          if (target) {
            // target sagt und nur, dass Ok geklickt wurde. wir nutzen source:
            const items = selectedData.map(item => new FilePara(item, undefined, "remove"));
            this.fileActionService.multiDo(items);
          }
        }
      );
  }

  onFindClicked() {
    const selectedData = this.selectionService.getSelectedOrFocussedData();
    let sources: string[] = this.getSourcePaths(selectedData);

    const data = new FindDialogData("", "**/*.");
    if (sources.length === 1) {
      data.folder = sources[0];

    } else if (sources.length > 1) {
      data.folders = sources;
      data.folder = sources.length + " selected folders";

    } else {
      data.folder = this.getSelectedTabData().path;
    }
    if (data.folder === SEARCH_SYMBOL) {
      const value = this.filePageDataService.getValue();
      data.folder = value.tabRows[0].tabs[0].path;
      if (data.folder === SEARCH_SYMBOL) {
        data.folder = "/";
      }
    }

    this.findDialogService
      .open(data, (res) => {
        if (res) {
          const findData: FindData = this.findSocketService.createFindData(res);

          // neuen Tab einfügen:
          const tabIdx = this.panelSelectionService.getValue();
          const tabData = new TabData(SEARCH_SYMBOL);
          tabData.findData = findData;

          const filePageData = this.filePageDataService.getValue();
          const tabsPanelData = filePageData.tabRows[tabIdx];
          tabsPanelData.tabs.push(tabData);
          tabsPanelData.selectedTabIndex = tabsPanelData.tabs.length;

          this.filePageDataService.update(filePageData);
        }
      });
  }

  onRenameClicked() {
    // TODO onRenameClicked
  }

  private getSourcePaths(selectedData: FileItemIf[]): string[] {
    if (selectedData.length) {
      return selectedData.map(f => {
        if (f.abs) {
          return f.base;
        }
        return f.dir + "/" + f.base;
      });
    }
    return [this.getSelectedTabData().path];
  }

  private clone<T>(o: T): T {
    return JSON.parse(JSON.stringify(o));
  }

  private getSelectedTabData(): TabData {
    const value = this.filePageDataService.getValue();
    const tabsPanelData = value.tabRows[this.panelSelectionService.getValue()];
    const selectedTabIndex = tabsPanelData?.selectedTabIndex;
    const tabData = tabsPanelData.tabs[selectedTabIndex];
    return tabData;
  }

  private getOtherPanelSelectedTabData(): TabData {
    const value = this.filePageDataService.getValue();
    const idx = this.panelSelectionService.getValue() === 0 ? 1 : 0;
    const tabsPanelData = value.tabRows[idx];
    const selectedTabIndex = tabsPanelData?.selectedTabIndex;
    const tabData = tabsPanelData.tabs[selectedTabIndex];
    return tabData;
  }
}

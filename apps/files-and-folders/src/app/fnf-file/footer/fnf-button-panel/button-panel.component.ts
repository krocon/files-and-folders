import {Component, Input} from "@angular/core";
import {CommandService} from "../../../service/fnf-command/command.service";
import {TableSelectionService} from "../../../service/fnf-table-selection/table-selection.service";
import {PanelIndex} from "../../../service/fnf-page-data/data/panel-index";
import {cssThemes, Theme} from "../../../fnf-custom-css/data/css-theme-type";
import {FileItemIf, getButtonEnableStates} from "@fnf/fnf-data";
import {ButtonEnableStates} from "./button-enable-states";
import {environment} from "../../../../environments/environment";


@Component({
  selector: "fnf-button-panel",
  templateUrl: "./button-panel.component.html",
  styleUrls: ["./button-panel.component.scss"]
})
export class ButtonPanelComponent {

  cmdInputVisible = false;
  themes = cssThemes;
  buttonEnableStates = new ButtonEnableStates();
  debugging = !environment.production;

  constructor(
    private readonly commandService: CommandService,
    private readonly selectionService: TableSelectionService
  ) {
  }

  private _activeSelectedFiles: FileItemIf[] = [];

  get activeSelectedFiles(): FileItemIf[] {
    return this._activeSelectedFiles;
  }

  @Input()
  set activeSelectedFiles(items: FileItemIf[]) {
    this._activeSelectedFiles = items;
    this.buttonEnableStates = getButtonEnableStates(items);
  }

  setTheme(theme: Theme) {
    this.commandService.setTheme(theme);
  }

  onTogglePanelClicked() {
    this.commandService.togglePanel();
  }

  onAddTabClicked() {
    this.commandService.onAddTabClicked();
  }

  onRemoveTabClicked() {
    this.commandService.onRemoveTabClicked();
  }

  setPanelActive(panelIndex: PanelIndex) {
    this.commandService.setPanelActive(panelIndex);
  }

  onSelectAllClicked() {
    this.selectionService.selectAll();
  }

  onDeselectAllClicked() {
    this.selectionService.deselectAll();
  }

  toggleSelection() {
    this.selectionService.toggleSelection();
  }

  onHistoryBackClicked($event: MouseEvent) {
    // TODO onHistoryBackClicked
  }

  onDebugClicked($event: MouseEvent) {
    this.commandService.debug();
  }

  onCopyClicked() {
    this.commandService.copy();
  }

  onMoveClicked() {
    this.commandService.move();
  }

  onDeleteClicked() {
    this.commandService.delete();
  }

  onEditClicked() {
    const selectedData = this.selectionService.getSelectedData();
    if (selectedData.length === 1) {
      const name = selectedData[0].dir + "/" + selectedData[0].base; // + '.' + selectedData[0].ext;
      this.commandService.editFile(name);
    }
  }

  onCreateDirClicked() {
    let name = "";
    const rowData = this.selectionService.getFocusedRowData();
    if (rowData) {
      name = rowData.base;
    }
    this.commandService.openCreateDirDialog(name);
  }

  openCustomColors() {
    const strWindowFeatures = "location=yes,height=600,width=800,scrollbars=yes,status=yes";
    const url = location.href + "/../customcss";
    window.open(url, "_blank", strWindowFeatures);
  }

  onFindClicked() {
    this.commandService.onFindClicked();
  }

  onReloadClicked() {
    this.commandService.reloadDir();
  }

  onRenameClicked() {
    this.commandService.onRenameClicked();
  }
}

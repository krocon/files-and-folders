import {Injectable} from "@angular/core";
import {ActionId} from "./fnf-action.enum";
import {FnfActionLabels} from "./fnf-action-labels";
import {CommandService} from "../fnf-command/command.service";


@Injectable({
  providedIn: "root"
})
export class ActionService {

  constructor(
    private readonly commandService: CommandService
  ) {
  }

  getLabelByActionId(actionId: ActionId): string {
    return FnfActionLabels.getLabel(actionId);
  }

  getLabelByStringKey(key: string): string {
    return FnfActionLabels.getLabel(key);
  }

  doAction(actionId: ActionId): void {
    if (actionId === "COPY_2_CLIPBOARD_FULLNAMES") return this.commandService.copyFullNames();
    if (actionId === "COPY_2_CLIPBOARD_NAMES") return this.commandService.copyNames();
    if (actionId === "COPY_2_CLIPBOARD_FULLNAMES_AS_JSON") return this.commandService.copyFullNamesAsJson();
    if (actionId === "COPY_2_CLIPBOARD_NAMES_AS_JSON") return this.commandService.copyNamesAsJson();
    if (actionId === "TOGGLE_SELECTION_CURRENT_ROW") return this.commandService.toggleCurrentRow();
    if (actionId === "SPACE_PRESSED") return this.commandService.sumSize();
    if (actionId === "ENTER_PRESSED") return this.commandService.onEnterPressed();
    if (actionId === "HOME_PRESSED") return this.commandService.onHomePressed();
    if (actionId === "END_PRESSED") return this.commandService.onEndPressed();
    if (actionId === "PAGEUP_PRESSED") return this.commandService.onPageUpPressed();
    if (actionId === "PAGEDOWN_PRESSED") return this.commandService.onPageDownPressed();

    if (actionId === "RELOAD_DIR") return this.commandService.reloadDir();
    if (actionId === "TOGGLE_PANEL") return this.commandService.togglePanel();
    if (actionId === "SELECT_RIGHT_PANEL") return this.commandService.selectRightPanel();
    if (actionId === "SELECT_LEFT_PANEL") return this.commandService.selectLeftPanel();
    if (actionId === "SAVE_CONFIG") return this.commandService.saveconfig();
    if (actionId === "SELECT_ALL") return this.commandService.selectAll();
    if (actionId === "DESELECT_ALL") return this.commandService.deselectAll();
    if (actionId === "TOGGLE_SELECTION") return this.commandService.toggleSelection();
    if (actionId === "ADD_NEW_TAB") return this.commandService.addNewTabOnActivePanel();
    if (actionId === "REMOVE_TAB") return this.commandService.removeTabOnActivePanel();
    if (actionId === "NAVIGATE_BACK") return this.commandService.navigateBack();
    if (actionId === "NAVIGATE_LEVEL_DOWN") return this.commandService.navigateDown();

    ActionService


    if (actionId.indexOf("OPEN_") === 0) return this.commandService.openDialog(actionId);

    console.warn("No action found for: ", actionId);
  }

  callActionByIdString(actionKey: string) {

  }

  // public callActionById(actionId: ActionId): void {
  //   if (actionId === "SPACE_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "HOME_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "END_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "PAGEUP_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "PAGEDOWN_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "ENTER_PRESSED") this.commandService.togglePanel()
  //   else if (actionId === "TOGGLE_SELECTION_CURRENT_ROW") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_GOTO_ANYTHING_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_COPY_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_MOVE_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_MKDIR_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_DELETE_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_DELETE_EMPTY_FOLDERS_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_CHDIR_DLG") this.commandService.togglePanel()
  //   else if (actionId === "SELECT_LEFT_PANEL") this.commandService.togglePanel()
  //   else if (actionId === "SELECT_RIGHT_PANEL") this.commandService.togglePanel()
  //   else if (actionId === "TOGGLE_PANEL") this.commandService.togglePanel()
  //   else if (actionId === "ADD_NEW_TAB") this.commandService.togglePanel()
  //   else if (actionId === "REMOVE_TAB") this.commandService.togglePanel()
  //   else if (actionId === "SAVE_CONFIG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_GROUPFILES_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_FIND_DUBLICATES_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_MULTIRENAME_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_RENAME_DLG") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_FIND_DLG") this.commandService.togglePanel()
  //   else if (actionId === "RELOAD_DIR") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_SELECT_DLG") this.commandService.togglePanel()
  //   else if (actionId === "SELECT_ALL") this.commandService.togglePanel()
  //   else if (actionId === "OPEN_DESELECT_DLG") this.commandService.openDialog(actionId)
  //   else if (actionId === "DESELECT_ALL") this.commandService.deselectAll()
  //   else if (actionId === "TOGGLE_SELECTION") this.commandService.togglePanel()
  //   else if (actionId === "NAVIGATE_LEVEL_DOWN") this.commandService.navigateDown()
  //   else if (actionId === "NAVIGATE_BACK") this.commandService.navigateBack()
  //   else if (actionId === "DUMMY_ACTION") this.commandService.togglePanel()
  // }
}

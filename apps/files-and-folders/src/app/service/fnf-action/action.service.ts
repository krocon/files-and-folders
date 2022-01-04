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
    return FnfActionLabels.getLabel(ActionId[actionId]);
  }

  getActionIdByString(key: string): ActionId {
    return parseInt(ActionId[key as any]);
  }

  getLabelByStringKey(key: string): string {
    return FnfActionLabels.getLabel(key);
  }

  doAction(actionId: ActionId): void {
    if (actionId === ActionId.COPY_2_CLIPBOARD_FULLNAMES) return this.commandService.copyFullNames();
    if (actionId === ActionId.COPY_2_CLIPBOARD_NAMES) return this.commandService.copyNames();
    if (actionId === ActionId.COPY_2_CLIPBOARD_FULLNAMES_AS_JSON) return this.commandService.copyFullNamesAsJson();
    if (actionId === ActionId.COPY_2_CLIPBOARD_NAMES_AS_JSON) return this.commandService.copyNamesAsJson();
    if (actionId === ActionId.TOGGLE_SELECTION_CURRENT_ROW) return this.commandService.toggleCurrentRow();
    if (actionId === ActionId.SPACE_PRESSED) return this.commandService.sumSize();
    if (actionId === ActionId.ENTER_PRESSED) return this.commandService.onEnterPressed();
    if (actionId === ActionId.HOME_PRESSED) return this.commandService.onHomePressed();
    if (actionId === ActionId.END_PRESSED) return this.commandService.onEndPressed();
    if (actionId === ActionId.PAGEUP_PRESSED) return this.commandService.onPageUpPressed();
    if (actionId === ActionId.PAGEDOWN_PRESSED) return this.commandService.onPageDownPressed();

    if (actionId === ActionId.RELOAD_DIR) return this.commandService.reloadDir();
    if (actionId === ActionId.TOGGLE_PANEL) return this.commandService.togglePanel();
    if (actionId === ActionId.SELECT_RIGHT_PANEL) return this.commandService.selectRightPanel();
    if (actionId === ActionId.SELECT_LEFT_PANEL) return this.commandService.selectLeftPanel();
    if (actionId === ActionId.SAVE_CONFIG) return this.commandService.saveconfig();
    if (actionId === ActionId.SELECT_ALL) return this.commandService.selectAll();
    if (actionId === ActionId.DESELECT_ALL) return this.commandService.deselectAll();
    if (actionId === ActionId.TOGGLE_SELECTION) return this.commandService.toggleSelection();
    if (actionId === ActionId.ADD_NEW_TAB) return this.commandService.addNewTabOnActivePanel();
    if (actionId === ActionId.REMOVE_TAB) return this.commandService.removeTabOnActivePanel();
    if (actionId === ActionId.NAVIGATE_BACK) return this.commandService.navigateBack();
    if (actionId === ActionId.NAVIGATE_LEVEL_DOWN) return this.commandService.navigateDown();

    const key: string = ActionId[actionId];
    if (key.indexOf("OPEN_") === 0) return this.commandService.openDialog(actionId);

    console.warn("No action found for: ", actionId);
  }

}

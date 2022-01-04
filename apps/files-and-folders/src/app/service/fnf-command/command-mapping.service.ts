import {Injectable} from "@angular/core";
import {CommandService} from "./command.service";


@Injectable({
  providedIn: "root"
})
export class CommandMappingService {


  constructor(
    private readonly commandService: CommandService,
  ) {
  }

  // TODO callActionById: richtiges Mapping
  public callActionById(actionId: string): void {
    if (actionId === "SPACE_PRESSED") this.commandService.togglePanel()
    else if (actionId === "HOME_PRESSED") this.commandService.togglePanel()
    else if (actionId === "END_PRESSED") this.commandService.togglePanel()
    else if (actionId === "PAGEUP_PRESSED") this.commandService.togglePanel()
    else if (actionId === "PAGEDOWN_PRESSED") this.commandService.togglePanel()
    else if (actionId === "ENTER_PRESSED") this.commandService.togglePanel()
    else if (actionId === "TOGGLE_SELECTION_CURRENT_ROW") this.commandService.togglePanel()
    else if (actionId === "OPEN_GOTO_ANYTHING_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_COPY_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_MOVE_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_MKDIR_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_DELETE_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_DELETE_EMPTY_FOLDERS_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_CHDIR_DLG") this.commandService.togglePanel()
    else if (actionId === "SELECT_LEFT_PANEL") this.commandService.togglePanel()
    else if (actionId === "SELECT_RIGHT_PANEL") this.commandService.togglePanel()
    else if (actionId === "TOGGLE_PANEL") this.commandService.togglePanel()
    else if (actionId === "ADD_NEW_TAB") this.commandService.togglePanel()
    else if (actionId === "REMOVE_TAB") this.commandService.togglePanel()
    else if (actionId === "SAVE_CONFIG") this.commandService.togglePanel()
    else if (actionId === "OPEN_GROUPFILES_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_FIND_DUBLICATES_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_MULTIRENAME_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_RENAME_DLG") this.commandService.togglePanel()
    else if (actionId === "OPEN_FIND_DLG") this.commandService.togglePanel()
    else if (actionId === "RELOAD_DIR") this.commandService.togglePanel()
    else if (actionId === "OPEN_SELECT_DLG") this.commandService.togglePanel()
    else if (actionId === "SELECT_ALL") this.commandService.togglePanel()
    else if (actionId === "OPEN_DESELECT_DLG") this.commandService.togglePanel()
    else if (actionId === "DESELECT_ALL") this.commandService.togglePanel()
    else if (actionId === "TOGGLE_SELECTION") this.commandService.togglePanel()
    else if (actionId === "NAVIGATE_LEVEL_DOWN") this.commandService.togglePanel()
    else if (actionId === "NAVIGATE_BACK") this.commandService.togglePanel()
    else if (actionId === "DUMMY_ACTION") this.commandService.togglePanel()
  }
}

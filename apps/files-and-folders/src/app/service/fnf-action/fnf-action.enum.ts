export const actionIds = [
  "OPEN_CHDIR_DLG",
  "OPEN_GOTO_ANYTHING_DLG",
  "OPEN_JOB_QUEUE_DLG",
  "OPEN_MULTIRENAME_DLG",
  "OPEN_RENAME_DLG",

  "COPY_2_CLIPBOARD_FULLNAMES",
  "COPY_2_CLIPBOARD_NAMES",
  "COPY_2_CLIPBOARD_FULLNAMES_AS_JSON",
  "COPY_2_CLIPBOARD_NAMES_AS_JSON",
  "OPEN_FIND_DLG",
  "OPEN_DROP_DLG",
  "OPEN_GROUPFILES_DLG",
  "OPEN_FIND_DUBLICATES_DLG",
  "OPEN_SELECT_DLG",
  "OPEN_DESELECT_DLG",
  "OPEN_DELETE_EMPTY_FOLDERS_DLG",
  "OPEN_COLORCONFIG_DLG",

  "REMOVE_TAB",
  "ADD_NEW_TAB",
  "TOGGLE_SELECTION",
  "SELECT_ALL",
  "DESELECT_ALL",
  "SELECT_RIGHT_PANEL",
  "SELECT_LEFT_PANEL",
  "ENHANCE_SELECTION",
  "DESELECT",
  "REDUCE_SELECTION",

  "NAVIGATE_LEVEL_DOWN",
  "NAVIGATE_BACK",
  "SAVE_CONFIG",
  "RELOAD_DIR",

  "ENTER_PRESSED",
  "HOME_PRESSED",
  "SPACE_PRESSED",
  "END_PRESSED",
  "PAGEUP_PRESSED",
  "PAGEDOWN_PRESSED",
  "TOGGLE_SELECTION_CURRENT_ROW",
  "DUMMY_ACTION",
  "TOGGLE_PANEL"
] as const;

export type ActionId = typeof actionIds[number];


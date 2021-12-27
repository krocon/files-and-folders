export const environment = {
  production: true,
  version: '{BUILD_VERSION}',
  commitHash: '{COMMIT_HASH}',

  config: {
    getUrl: "/api/config"
  },
  sysinfo: {
    getDrivesUrl: "/api/drives",
    getSysinfoUrl: "/api/sysinfo",
    getFirstStartFolderUrl: "/api/firststartfolder"
  },
  fileSystem: {
    checkPathUrl: "/api/checkpath",
    readDirUrl: "/api/readdir"
  },
  lookAndFeel: {
    getLookAndFeelUrl: "assets/config/color/%theme%.json"
  },
  shortcut: {
    getShortcutActionMappingUrl: "assets/config/shortcut/windows.json"
  },
  edit: {
    getFile: "api/file?name=",
    saveFile: "api/file?name="
  },
  fileAction: {
    url: "api/do",
    multiUrl: "api/do/multi",
  }
};

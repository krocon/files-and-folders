export const environment = {
  production: true,
  version: '29.12.2021 18:39',
  commitHash: 'a1d72c1',

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

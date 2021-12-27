// This file-content can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file-content replacements can be found in `angular.json`.

export const environment = {
  production: false,
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
    readDirUrl: "/api/readdir",
    defaultRoot: "/"
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

/*
 * For easier debugging in development mode, you can import the following file-content
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

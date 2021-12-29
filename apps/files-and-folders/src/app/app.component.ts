import {Component, OnInit} from "@angular/core";
import {SysinfoService} from "./service/fnf-sysinfo/sysinfo.service";
import {environment} from "../environments/environment";
import {LookAndFeelService} from "./service/fnf-look-and-feel/look-and-feel.service";
import {ShortcutService} from "./service/fnf-shortcut/shortcut.service";
import {EditDataService} from "./fnf-edit/fnf-edit-data/edit-data.service";
import {FileSystemService} from "./service/fnf-file-system/file-system.service";
import {FilePageDataService} from "./service/fnf-page-data/file-page-data.service";
import {ConfigService} from "./service/fnf-config/config.service";
import {Config} from "@fnf/fnf-data";
import {DockerRootDeletePipe} from "./fnf-file/pipe/docker-root-delete.pipe";

@Component({
  selector: "fnf-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {

  config : Config = new Config();

  constructor(
    private readonly lookAndFeelService: LookAndFeelService,
    private readonly shortcutService: ShortcutService,
    private readonly sysinfoService: SysinfoService,
    private readonly filePageDataService: FilePageDataService,
    private readonly configService: ConfigService,
  ) {
    // Set config to services:
    ConfigService.forRoot(environment.config);
    SysinfoService.forRoot(environment.sysinfo);
    LookAndFeelService.forRoot(environment.lookAndFeel);
    ShortcutService.forRoot(environment.shortcut);
    EditDataService.forRoot(environment.edit);
    FileSystemService.forRoot(environment.fileSystem);
  }

  ngOnInit(): void {
    console.info('Files and Folders');
    console.info('        > Build Version:', environment.version);
    console.info('        > Commit Hash  :', environment.commitHash);
    // console.info('        > all          :', environment);
    const subs = this.configService
      .getConfig()
      .subscribe(config => {
        subs.unsubscribe();
        console.info('        > Config       :', config);
        DockerRootDeletePipe.dockerRoot = config.dockerRoot;
    });

    // init look and feel (LaF):
    this.lookAndFeelService.init();

    // init shortcuts:
    this.shortcutService.init();

    // first start ever?
    this.filePageDataService.getValue()
    if (this.filePageDataService.getValue().default) {
      const subs = this.sysinfoService
        .getFirstStartFolder()
        .subscribe(startFolder => {
          subs.unsubscribe();
          const v = this.filePageDataService.getValue();
          v.default = false;
          v.tabRows[0].tabs[0].path = startFolder;
          v.tabRows[1].tabs[0].path = startFolder;
          this.filePageDataService.update(v);
        });
    }
  }

}

import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import * as path from "path";
import * as fs from "fs-extra";
import { DirEvent, DirPara, FileItem, fixPath, getZipUrlInfo, isZipUrl } from '@fnf/fnf-data';
import { environment } from "../../environments/environment";
import { FSWatcher } from "chokidar";
import { Observable } from "rxjs";
import { WatchEventData } from "./watch-event.data";
import { distinctUntilChanged } from "rxjs/operators";
import { unpacklist } from "../file-action/action/unpack-list.fn";
import { stats2FileItem } from "./stats-to-file";


@WebSocketGateway(environment.websocketPort, environment.websocketOptions)
export class DirGateway {

  @WebSocketServer() server: Server;

  private fsWatcher: FSWatcher;


  constructor() {
    this.fsWatcher = new FSWatcher({
      ignoreInitial: true,
      disableGlobbing: true,
      depth: 0,
      atomic: true
    });
    new Observable<WatchEventData>(
      (subscriber) => {
        this.fsWatcher
          .on("all", (event, f) => {
            subscriber.next(new WatchEventData(event, f));
          });
      })
      .pipe(
        distinctUntilChanged(
          (prev, curr) =>
            prev?.event === curr.event && prev?.file === curr.file)
      )
      .subscribe(wed => {
        if (wed.event === "add" || wed.event === "addDir") {
          const fileItem = this.createFileItem(wed.file);
          const dirEvent = new DirEvent(fileItem.dir, [fileItem], false, false, 1, "", wed.event);
          this.server.emit("watching", dirEvent);

        } else if (wed.event === "unlink" || wed.event === "unlinkDir" || wed.event === "change") {
          const fileItem = this.createFileItemByFullPath(wed.file);
          fileItem.isDir = wed.event === "unlinkDir";
          const dirEvent = new DirEvent(fileItem.dir, [fileItem], false, false, 1, "", wed.event);
          this.server.emit("watching", dirEvent);
        }
      }, error => {
        console.error(error);
      });

  }

  @SubscribeMessage("watch")
  watch(@MessageBody() para: DirPara): void {
    this.fsWatcher.add(para.path);
  }

  @SubscribeMessage("unwatch")
  unwatch(@MessageBody() para: DirPara): void {
    this.fsWatcher.unwatch(para.path);
  }

  @SubscribeMessage("dir")
  onDir(@MessageBody() para: DirPara): void {
    let p = para.path;
    if (p.indexOf(":") === p.length - 1) p = path.join(p, "/");
    p = fixPath(p);

    const emmitKey = `dir${para.rid}`;

    try {
      if (isZipUrl(p)) {
        this.readZipDir(p, emmitKey);
      } else {
        this.readdir(p, emmitKey);
      }
    } catch (e) {
      console.error(e);
      const ev = new DirEvent(p, [], true, true, 0, e);
      this.server.emit(emmitKey, ev);
    }
  }

  private createFileItemByFullPath(full: string): FileItem {
    return new FileItem(path.dirname(full), path.basename(full), path.extname(full));
  }

  private readZipDir(file: string, emmitKey: string): void {
    const zipUrlInfo = getZipUrlInfo(file);
    unpacklist(zipUrlInfo.zipUrl)
      .then(ev => {
        this.server.emit(emmitKey, ev);
      });
  }

  private readdir(p: string, emmitKey: string): void {
    const socket = this.server;
    const files = fs.readdirSync(p); //, (error, files) => {
    const allAtOnce = files.length < 10000;

    if (!allAtOnce) {
      const previews = files.map(
        (f) => new FileItem(p, fixPath(f), path.extname(f), null)
      );
      const end = files.length === 0;
      const firstEvent = new DirEvent(p, previews, true, end, files.length, "", "listpreview");
      socket.emit(emmitKey, firstEvent);
    }

    const fileItems: FileItem[] = [];
    for (let idx = 0; idx < files.length; idx++) {
      const f = files[idx];
      const ff = path.join(p, "/", f);

      const fileItem = new FileItem(
        p,
        fixPath(f),
        path.extname(f),
        null
      );
      fileItems.push(fileItem);

      const dirEvent = new DirEvent(p, [fileItem]);

      try {
        const stats = fs.statSync(ff);
        stats2FileItem(stats, fileItem);
      } catch (e) {
        fileItem.error = e;
        console.info("DirGateWay() stats error:", e.message);
      }
      if (idx === files.length - 1) {
        dirEvent.end = true;
      }
      if (!allAtOnce) {
        socket.emit(emmitKey, dirEvent);
      }
    } // for

    if (allAtOnce) {
      const dirEvent = new DirEvent(p, fileItems, true, true, fileItems.length, "", "list");
      socket.emit(emmitKey, dirEvent);
    }
  }

  private createFileItem(file: string): FileItem {
    const stats = fs.statSync(file);

    const dir = path.dirname(file);
    const base = path.basename(file);
    const ext = path.extname(file);
    const fileItem = new FileItem(dir, base, ext, null);

    stats2FileItem(stats, fileItem);

    return fileItem;
  }

}
